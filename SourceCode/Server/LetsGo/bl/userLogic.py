from pymongo import ReturnDocument

from LetsGo.models.userModels import *
from LetsGo.config.settings import USER_REGISTRATION_INFO_TABLE_NAME, FUTURE_TRIP_TABLE_NAME
from LetsGo.config.db import db_conn
from pymongo.errors import DuplicateKeyError
from LetsGo.bl.futureTripLogic import delete_trip_bl, remove_all_comment_of_user_in_trip
from LetsGo.bl.chatLogic import delete_chat_bl
from LetsGo.models.userModels import UserRegistrationInfoModel

user_table = db_conn[USER_REGISTRATION_INFO_TABLE_NAME]
future_trip_table = db_conn[FUTURE_TRIP_TABLE_NAME]
user_table.create_index("email", name='email_index', unique=True)


def create_user_bl(user_model: UserRegistrationInfoModel):
    try:
        new_user = user_table.insert_one(user_model)
        created_user = user_table.find_one(
            {"_id": new_user.inserted_id}
        )
    except DuplicateKeyError as e:
        raise e
    return created_user


def update_user_bl(update_user_model: UpdateUserRegistrationInfoModel):
    filters = {'email': update_user_model['email']}
    new_values = {"$set": {k: v for k, v in update_user_model.items() if v is not None}}
    updated_user = user_table.find_one_and_update(filters, new_values, return_document=ReturnDocument.AFTER)
    return updated_user


def update_password_bl(update_password_model: UpdatePasswordModel):
    user = user_table.find_one(
        {"email": update_password_model['email']}
    )
    if user["password"] != update_password_model['current_password']:
        return False
    else:
        user_table.update_one(
            {"email": update_password_model['email']},
            {"$set": {'password': update_password_model['new_password']}}
        )
        return True


def login_bl(login_model: LoginModel):
    user = user_table.find_one({
        "email": login_model['email'],
        "password": login_model['password']
    })
    return user


def delete_user_bl(login_model: LoginModel):
    user_to_delete = user_table.find_one({"email": login_model['email']})
    [delete_trip_bl(trip_id) for trip_id in user_to_delete["future_trips"]]
    [remove_all_comment_of_user_in_trip(trip_id, login_model['email'])
     for trip_id in user_to_delete["comment_trip_index"]]
    delete_chat_bl(login_model['email'])
    user_table.delete_one({"email": login_model['email']})


def get_user_bl(email):
    user = user_table.find_one({"email": email})
    return user


def search_users_by_name_bl(name: str):
    search_query = {"name": {"$regex": name, "$options": "i"}}
    found_users = list(user_table.find(search_query))
    return found_users
