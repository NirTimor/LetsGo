from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from pymongo.errors import DuplicateKeyError
from LetsGo.models.interestModels import *
from LetsGo.config.db import mongo_conn, db_conn
from LetsGo.bl.interestLogic import *
from bson import ObjectId

interestAPI = APIRouter()


@interestAPI.get('/interest/', status_code=status.HTTP_200_OK, response_model=List[InterestModel])
def get_interests():
    return get_interests_bl()


@interestAPI.post('/interest/', status_code=status.HTTP_201_CREATED, response_model=InterestModel)
def create_interest(request: Request, interest_model: InterestModel = Body(...)):
    interest_model = jsonable_encoder(interest_model)
    created_interest = create_interest_bl(interest_model)
    return created_interest
