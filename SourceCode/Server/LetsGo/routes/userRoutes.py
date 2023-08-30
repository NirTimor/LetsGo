from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from pymongo.errors import DuplicateKeyError
from LetsGo.models.userModels import *
from LetsGo.bl.userLogic import *

from LetsGo.bl.userLogic import *

userAPI = APIRouter()


@userAPI.post('/user/', response_description="New user has created", status_code=status.HTTP_201_CREATED)
def create_user(request: Request, user_model: UserRegistrationInfoModel = Body(...)):
    user_model = jsonable_encoder(user_model)
    try:
        return_user = create_user_bl(user_model)
    except DuplicateKeyError:
        raise HTTPException(status_code=200, detail="Email exists already")
    return return_user


@userAPI.put('/user/password', response_description="Password has changed", status_code=status.HTTP_200_OK)
def update_password(request: Request, update_password_model: UpdatePasswordModel = Body(...)):
    update_password_model = jsonable_encoder(update_password_model)
    if update_password_bl(update_password_model):
        pass
    else:
        raise HTTPException(status_code=409, detail="Password is incorrect")


@userAPI.post('/user/login')
def login(request: Request, login_model: LoginModel = Body(...)):
    login_model = jsonable_encoder(login_model)
    user = login_bl(login_model)
    if user is None:
        raise HTTPException(status_code=401, detail="Email and Password are incorrect")
    return user


@userAPI.put('/user/', status_code=status.HTTP_200_OK)
def update_user(request: Request, update_model: UpdateUserRegistrationInfoModel):
    update_model = jsonable_encoder(update_model)
    return update_user_bl(update_model)


@userAPI.delete('/user/', status_code=status.HTTP_200_OK)
def delete_user(request: Request, login_model: LoginModel):
    login_model = jsonable_encoder(login_model)
    delete_user_bl(login_model)


@userAPI.get('/user/', status_code=status.HTTP_200_OK)
def get_user(email: str):
    return get_user_bl(email)


@userAPI.get('/search_users/', status_code=status.HTTP_200_OK)
def search_users_by_name(name: str):
    users = search_users_by_name_bl(name)
    return users
