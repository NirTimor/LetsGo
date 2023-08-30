from fastapi import APIRouter, Body, Request, Response, HTTPException, status, Depends
from fastapi.encoders import jsonable_encoder
from typing import List, Annotated
from LetsGo.models.futureTripModels import *
from LetsGo.bl.futureTripLogic import *
from LetsGo.models.utilsModels import *

future_trip_API = APIRouter()


@future_trip_API.get('/trip/', status_code=status.HTTP_200_OK)
def get_future_trips(filters: FilterQueryParams = Depends()):
    interests_list = None
    if filters.interests:
        interests_list = [int(interest) for interest in filters.interests.split(",")]

    filters.interests = interests_list
    return get_future_trips_bl(filters)


@future_trip_API.delete('/trip/', status_code=status.HTTP_200_OK)
def delete_future_trip(trip_id: str):
    delete_trip_bl(trip_id)


@future_trip_API.post('/trip/', status_code=status.HTTP_201_CREATED, response_model=FutureTripModel)
def create_future_trip(request: Request, future_trip_model: FutureTripModel = Body(...)):
    future_trip_model = jsonable_encoder(future_trip_model)
    created_trip = create_future_trip_bl(future_trip_model)
    return created_trip


@future_trip_API.put('/trip/', status_code=status.HTTP_200_OK)
def update_future_trip(request: Request, updated_trip: UpdateFutureTripModel = Body(...)):
    updated_trip = jsonable_encoder(updated_trip)
    return update_future_trip_bl(updated_trip)


@future_trip_API.get('/trip/email', status_code=status.HTTP_200_OK)
def get_future_trips_by_email(email: str, paging_params: PagingParams = Depends()):
    try:
        return get_future_trips_by_email_bl(email, paging_params)
    except Exception as e:
        print(e)


@future_trip_API.get('/trip/favorites', status_code=status.HTTP_200_OK)
def get_favorites_future_trips(email: str, paging_params: PagingParams = Depends()):
    return get_favorites_future_trips_bl(email, paging_params)


@future_trip_API.put('/trip/like', status_code=status.HTTP_200_OK, response_model=None)
def like_future_trips(email: str, trip_id: str):
    like_trip_bl(email, trip_id)


@future_trip_API.put('/trip/unlike', status_code=status.HTTP_200_OK, response_model=None)
def unlike_future_trips(email: str, trip_id: str):
    unlike_trip_bl(email, trip_id)


@future_trip_API.put('/trip/favorite', status_code=status.HTTP_200_OK, response_model=None)
def add_to_favorites(email: str, trip_id: str):
    add_to_favorites_bl(email, trip_id)


@future_trip_API.put('/trip/unfavorite', status_code=status.HTTP_200_OK, response_model=None)
def remove_from_favorites(email: str, trip_id: str):
    remove_from_favorites_bl(email, trip_id)


@future_trip_API.post('/trip/comment', status_code=status.HTTP_201_CREATED)
def add_comment(trip_id: str, comment: TripCommentModel = Body(...)):
    comment = jsonable_encoder(comment)
    return add_comment_to_post(trip_id, comment)


@future_trip_API.delete('/trip/comment', status_code=status.HTTP_200_OK)
def delete_comment(trip_id: str, comment_id: str):
    return remove_comment_to_post(trip_id, comment_id)
