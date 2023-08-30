from pymongo import ReturnDocument

from LetsGo.models.chatMsgModels import *
from LetsGo.models.chatRoomModels import *
from LetsGo.config.settings import CHAT_ROOM_TABLE_NAME
from LetsGo.config.db import db_conn
from bson.binary import Binary
from pymongo.errors import DuplicateKeyError

chat_room_table = db_conn[CHAT_ROOM_TABLE_NAME]


def get_all_chats_bl(email: str):
    chats = chat_room_table.find({"$or": [
            {"email_user1": email},
            {"email_user2": email}
        ]}, {"messages": {"$slice": -1}}).sort("creation_datetime", -1)
    return list(chats)


def get_chat_bl(chat_id: str = None, email_user1: str = None, email_user2: str = None):
    if chat_id is not None:
        return chat_room_table.find_one({"_id": chat_id})
    ordered_emails = sort_emails_by_ascii(email_user1, email_user2)
    return chat_room_table.find_one({"$and": [
        {"email_user1": ordered_emails[0]},
        {"email_user2": ordered_emails[1]}
        ]})


def send_message_bl(msg: SendMsgModel):
    new_msg = ChatMsgModel()
    new_msg.sender_email = msg["sender_email"]
    new_msg.message = msg["message"]
    new_msg.id = msg["_id"]
    chat_msg_dict = dict(new_msg)
    ordered_emails = sort_emails_by_ascii(msg["sender_email"], msg["receiver_email"])
    update_chatroom_result = chat_room_table.update_one({"$and": [
        {"email_user1": ordered_emails[0]},
        {"email_user2": ordered_emails[1]}]},
        {"$addToSet": {"messages": chat_msg_dict}})
    if update_chatroom_result.matched_count == 0:
        new_chat = ChatRoomModel()
        new_chat.email_user1 = ordered_emails[0]
        new_chat.email_user2 = ordered_emails[1]
        new_chat_dict = dict(new_chat)
        new_chat_dict["_id"] = str(new_chat.id)
        new_chat_dict["id"] = str(new_chat.id)
        new_chat_dict["messages"].append(chat_msg_dict)
        new_chatroom_result = chat_room_table.insert_one(new_chat_dict)
        return chat_room_table.find_one({"_id": new_chatroom_result.inserted_id})
    return None


def delete_chat_bl(email: str):
    chat_room_table.delete_many({"$or": [
        {"email_user1": email},
        {"email_user2": email}
    ]})


def sort_emails_by_ascii(email1: str, email2: str):
    is_email1_greater_flag = email1 > email2
    first_email = (email1, email2)[is_email1_greater_flag]
    second_email = (email1, email2)[not is_email1_greater_flag]
    return [first_email, second_email]
