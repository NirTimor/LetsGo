import uuid
from pydantic import BaseModel, Field
from datetime import datetime

from LetsGo.models.chatMsgModels import ChatMsgModel


class ChatRoomModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    creation_datetime: datetime = datetime.now()
    email_user1: str = ""
    email_user2: str = ""
    messages: list[ChatMsgModel] = []

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "email_user1": "aaa@gmail.com",
                "email_user2": "bbb@gmail.com",
                "messages": [{
                    "time": datetime.now().strftime("%H:%M"),
                    "date": datetime.now().strftime("%d %B, %Y"),
                    "sender_email": "aaa@gmail.com",
                    "message": """Mauris a vestibulum nisi. Proin interdum massa ornare convallis efficitur. Praesent viverra accumsan lectus, et porttitor mi feugiat vel. Curabitur tristique placerat leo, molestie sodales elit dictum ac. Sed convallis mauris et aliquet sollicitudin. Sed sed arcu in lorem semper dignissim aliquet quis lacus. Maecenas consequat velit quis varius lobortis. Suspendisse pellentesque semper ante, nec ultrices magna mollis non.
Nullam vestibulum magna ac lectus lobortis dictum. Praesent sed mauris egestas, varius lorem ut, aliquam purus. Donec ut ipsum fermentum, vehicula eros sollicitudin, malesuada lorem. Pellentesque fringilla placerat nibh non condimentum. Integer ultricies nunc quis enim placerat lobortis. Cras accumsan ligula quis quam blandit sodales. Etiam mattis ipsum enim, eu lobortis arcu lobortis a. Morbi eget facilisis tellus. Quisque condimentum eleifend augue, sit amet dictum purus aliquet ut. Fusce non tortor sit amet nunc iaculis posuere.""",}]
            }
        }
