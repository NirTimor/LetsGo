from bson import ObjectId
from pymongo import ReturnDocument

from datetime import date
from LetsGo.models.futureTripModels import *
from LetsGo.config.settings import FUTURE_TRIP_TABLE_NAME, USER_REGISTRATION_INFO_TABLE_NAME
from LetsGo.config.db import db_conn
from LetsGo.models.utilsModels import *
from fastapi import HTTPException, status

future_trip_table = db_conn[FUTURE_TRIP_TABLE_NAME]
user_table = db_conn[USER_REGISTRATION_INFO_TABLE_NAME]


def get_user_bl(email):
    user = user_table.find_one({"email": email})
    return user


def get_future_trips_bl(filters: FilterQueryParams):
    filter_query = {
        "country": filters.country,
        "city": filters.city,
        "duration_days": {"$lte": filters.duration_days},
        "end_month": {"$lte": filters.end_month},
        "start_month": {"$gte": filters.start_month},
        "is_flexible": filters.is_flexible
    }
    # remove all none fields
    filter_query = {k: v for k, v in filter_query.items() if v is not None}
    sorted_filtered_trips = list(future_trip_table
                                 .find(filter_query)
                                 .sort("creation_datetime", (1, -1)[filters.asc]))
    sorted_filtered_and_limited_trips = []
    for trip in sorted_filtered_trips:
        if filters.limit > 0:
            user_instance = get_user_bl(trip["user_email"])
            is_male_valid_flag = filters.is_male is None or user_instance["is_male"] is filters.is_male
            user_birthday = datetime.strptime(user_instance["birthdate"].split("T")[0], '%Y-%m-%d')
            today = date.today()
            age = today.year - user_birthday.year - (
                    (today.month, today.day) < (user_birthday.month, user_birthday.day))
            age_valid_flag = filters.start_age_range <= age <= filters.end_age_range
            interests_valid_flag = filters.interests is None \
                                   or set(filters.interests).issubset(user_instance["interests"])
            if is_male_valid_flag and age_valid_flag and interests_valid_flag:
                if filters.skip > 0:
                    filters.skip = filters.skip - 1
                else:
                    user_name = user_instance["name"]
                    trip["user_name"] = user_name
                    sorted_filtered_and_limited_trips.append(trip)
                    filters.limit = filters.limit - 1
    return sorted_filtered_and_limited_trips


def delete_trip_bl(trip_id: str):
    trip_to_delete = future_trip_table.find_one({"_id": trip_id})
    user_table.update_many(
        {"email": {"$in": trip_to_delete["liked_users"]}},
        {"$pull": {"liked_trips": trip_id}}
    )
    user_table.update_many(
        {"email": {"$in": trip_to_delete["favorites_users"]}},
        {"$pull": {"favorite_trips": trip_id}}
    )
    [remove_comment_to_post(trip_id, comment["_id"]) for comment in trip_to_delete["comments"]]
    deleted_trip = future_trip_table.delete_one({"_id": trip_id})
    user = user_table.find_one({'email': trip_to_delete['user_email']})
    filters = {'email': user['email']}
    user['future_trips'].remove(trip_id)
    new_values = {"$set": {"future_trips": user['future_trips']}}
    user_table.update_one(filters, new_values)


def update_future_trip_bl(updated_trip: UpdateFutureTripModel):
    filters = {'_id': updated_trip['id']}
    new_values = {"$set": {k: v for k, v in updated_trip.items() if v is not None and k != 'id'}}
    updated_future_trip = future_trip_table.find_one_and_update(filters, new_values,
                                                                return_document=ReturnDocument.AFTER)
    return updated_future_trip


def create_future_trip_bl(future_trip: FutureTripModel):
    new_trip = future_trip_table.insert_one(future_trip)
    created_trip = future_trip_table.find_one(
        {"_id": new_trip.inserted_id}
    )
    user = user_table.find_one({'email': future_trip['user_email']})
    filters = {'email': user['email']}
    user['future_trips'].append(created_trip['_id'])
    new_values = {"$set": {"future_trips": user['future_trips']}}
    user_table.update_one(filters, new_values)
    return created_trip


def get_favorites_future_trips_bl(email: str, paging_params: PagingParams):
    user = user_table.find_one({'email': email})
    fav_trips = future_trip_table.find({"_id": {"$in": user["favorite_trips"]}}) \
        .sort("creation_datetime", (1, -1)[paging_params.asc]) \
        .skip(paging_params.skip) \
        .limit(paging_params.limit)
    return list(fav_trips)


def get_future_trips_by_email_bl(email: str, paging_params: PagingParams):
    try:
        user = user_table.find_one({'email': email})
        future_trips = future_trip_table.find({"_id": {"$in": user["future_trips"]}}) \
            .sort("creation_datetime", (1, -1)[paging_params.asc]) \
            .skip(paging_params.skip) \
            .limit(paging_params.limit)
        return list(future_trips)
    except Exception as e:
        print(e)


def add_to_favorites_bl(email: str, trip_id: str):
    user_table.update_one(
        {'email': email},
        {"$addToSet": {"favorite_trips": trip_id}}
    )
    future_trip_table.update_one(
        {"_id": trip_id},
        {"$addToSet": {"favorites_users": email}}
    )


def remove_from_favorites_bl(email: str, trip_id: str):
    user_table.update_one(
        {'email': email},
        {"$pull": {"favorite_trips": trip_id}}
    )
    future_trip_table.update_one(
        {"_id": trip_id},
        {"$pull": {"favorites_users": email}}
    )


def like_trip_bl(email: str, trip_id: str):
    future_trip_table.update_one(
        {"_id": trip_id},
        {"$inc": {"likes": 1}}
    )
    future_trip_table.update_one(
        {"_id": trip_id},
        {"$addToSet": {"liked_users": email}}
    )
    user_table.update_one(
        {'email': email},
        {"$addToSet": {"liked_trips": trip_id}}
    )


def unlike_trip_bl(email: str, trip_id: str):
    future_trip_table.update_one(
        {"_id": trip_id},
        {"$inc": {"likes": -1}}
    )
    future_trip_table.update_one(
        {"_id": trip_id},
        {"$pull": {"liked_users": email}}
    )
    user_table.update_one(
        {'email': email},
        {"$pull": {"liked_trips": trip_id}}
    )


def add_comment_to_post(trip_id: str, comment: TripCommentModel):
    updated_trip = future_trip_table.find_one_and_update(
        {"_id": trip_id},
        {"$addToSet": {"comments": comment}},
        return_document=ReturnDocument.AFTER
    )
    user_table.update_one(
        {'email': comment["user_email"]},
        {"$addToSet": {"comment_trip_index": trip_id}}
    )
    return updated_trip


def remove_comment_to_post(trip_id: str, comment_id: str):
    comments = future_trip_table.find_one(
        {"_id": trip_id},
        {"comments": 1}
    )
    updated_trip = future_trip_table.find_one_and_update(
        {"_id": trip_id},
        {"$pull": {"comments": {"_id": comment_id}}},
        return_document=ReturnDocument.AFTER
    )
    comments = comments["comments"]
    relevant_comment_index = -1
    for n, comment in enumerate(comments):
        if comment_id == comment["_id"]:
            relevant_comment_index = n
    relevant_comment = comments.pop(relevant_comment_index)
    user_email = relevant_comment["user_email"]
    trip = future_trip_table.find_one({"_id": trip_id})
    result = any(user_email == d["user_email"] for d in comments)
    if not result:
        user_table.update_one(
            {'email': user_email},
            {"$pull": {"comment_trip_index": trip_id}}
        )
    return updated_trip


def remove_all_comment_of_user_in_trip(trip_id: str, email: str):
    future_trip_table.update_many(
        {"_id": trip_id},
        {"$pull": {"comments": {"user_email": email}}}
    )
