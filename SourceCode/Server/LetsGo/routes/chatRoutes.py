from fastapi import APIRouter, Body, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List
from pymongo.errors import DuplicateKeyError
from LetsGo.models.chatMsgModels import *
from LetsGo.models.chatRoomModels import *
from LetsGo.config.db import mongo_conn, db_conn
from LetsGo.bl.chatLogic import *
from bson import ObjectId

chatAPI = APIRouter()


@chatAPI.get('/chat/', status_code=status.HTTP_200_OK, response_model=List[ChatRoomModel])
def get_all_chats(email: str):
    return get_all_chats_bl(email)


@chatAPI.get('/chat/id/', status_code=status.HTTP_200_OK, response_model=ChatRoomModel)
def get_chat_by_id(chat_id: str):
    response = get_chat_bl(chat_id=chat_id)
    return response


@chatAPI.get('/chat/emails/', status_code=status.HTTP_200_OK, response_model=ChatRoomModel)
def get_chat_by_emails(email_user1: str, email_user2: str):
    response = get_chat_bl(chat_id=None, email_user1=email_user1, email_user2=email_user2)
    return response


@chatAPI.post('/chat/message', status_code=status.HTTP_200_OK)
def send_message(msg: SendMsgModel = Body(...)):
    msg = jsonable_encoder(msg)
    return send_message_bl(msg)
