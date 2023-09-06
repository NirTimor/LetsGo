import uuid
from typing import Optional
import io
from pydantic import BaseModel, Field
import datetime
from datetime import timedelta


class UserRegistrationInfoModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    registration_datetime: datetime.datetime = datetime.datetime.now()
    email: str = Field(...)
    password: str
    name: str = Field(...)
    is_male: bool = Field(...)
    birthdate: datetime.date = Field(...)
    country: str
    city: str
    work_as: str = ""
    languages: list[str] = []
    visited_countries: list[str] = []
    liked_trips: list[str] = []
    have_kids: bool = False
    do_smoke: bool = False
    do_drink: bool = False
    interests: list[int] = []
    bio: str = ""
    profile_photo: str = ""
    photos: list[str] = []
    ideal_partner_details: str = ""
    future_trips: list[str] = []
    favorite_trips: list[str] = []
    comment_trip_index: list[str] = []

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "registration_datetime": datetime.datetime.now(),
                "email": "aaa@gmail.com",
                "password": "12345678",
                "name": "Omer",
                "is_male": True,
                "birthdate": datetime.date.today() - timedelta(days=30),
                "country": "Israel",
                "city": "Holon",
                "work_as": "Programmer",
                "languages": ["en", "fr"],
                "visited_countries": ["", ""],
                "liked_trips": [],
                "have_kids": False,
                "do_smoke": False,
                "do_drink": False,
                "interests": [2, 1],
                "bio": """Mauris a vestibulum nisi. Proin interdum massa ornare convallis efficitur. Praesent viverra accumsan lectus, et porttitor mi feugiat vel. Curabitur tristique placerat leo, molestie sodales elit dictum ac. Sed convallis mauris et aliquet sollicitudin. Sed sed arcu in lorem semper dignissim aliquet quis lacus. Maecenas consequat velit quis varius lobortis. Suspendisse pellentesque semper ante, nec ultrices magna mollis non.
Nullam vestibulum magna ac lectus lobortis dictum. Praesent sed mauris egestas, varius lorem ut, aliquam purus. Donec ut ipsum fermentum, vehicula eros sollicitudin, malesuada lorem. Pellentesque fringilla placerat nibh non condimentum. Integer ultricies nunc quis enim placerat lobortis. Cras accumsan ligula quis quam blandit sodales. Etiam mattis ipsum enim, eu lobortis arcu lobortis a. Morbi eget facilisis tellus. Quisque condimentum eleifend augue, sit amet dictum purus aliquet ut. Fusce non tortor sit amet nunc iaculis posuere.""",
                "profile_photo": io.BytesIO().getvalue(),
                "photos": [io.BytesIO().getvalue(), io.BytesIO().getvalue(), io.BytesIO().getvalue()],
                "ideal_partner_details": """Mauris a vestibulum nisi. Proin interdum massa ornare convallis efficitur. Praesent viverra accumsan lectus, et porttitor mi feugiat vel. Curabitur tristique placerat leo, molestie sodales elit dictum ac. Sed convallis mauris et aliquet sollicitudin. Sed sed arcu in lorem semper dignissim aliquet quis lacus. Maecenas consequat velit quis varius lobortis. Suspendisse pellentesque semper ante, nec ultrices magna mollis non.
Nullam vestibulum magna ac lectus lobortis dictum. Praesent sed mauris egestas, varius lorem ut, aliquam purus. Donec ut ipsum fermentum, vehicula eros sollicitudin, malesuada lorem. Pellentesque fringilla placerat nibh non condimentum. Integer ultricies nunc quis enim placerat lobortis. Cras accumsan ligula quis quam blandit sodales. Etiam mattis ipsum enim, eu lobortis arcu lobortis a. Morbi eget facilisis tellus. Quisque condimentum eleifend augue, sit amet dictum purus aliquet ut. Fusce non tortor sit amet nunc iaculis posuere.""",
                "future_trips": [],
                "favorite_trips": []
            }
        }


class UpdateUserRegistrationInfoModel(BaseModel):
    email: str
    name: Optional[str]
    country: Optional[str]
    city: Optional[str]
    work_as: Optional[str]
    languages: Optional[list[str]]
    visited_countries: Optional[list[str]]
    liked_trips: Optional[list[str]]
    have_kids: Optional[bool]
    do_smoke: Optional[bool]
    do_drink: Optional[bool]
    interests: Optional[list[int]]
    bio: Optional[str]
    profile_photo: Optional[str]
    photos: Optional[list[str]]
    ideal_partner_details: Optional[str]

    class Config:
        json_schema_extra = {
            "example": {
                "email": "aaa@gmail.com",
                "name": "Omer",
                "country": "Israel",
                "city": "Holon",
                "work_as": "Programmer",
                "languages": ["en", "fr"],
                "visited_countries": ["", ""],
                "liked_trips": [],
                "have_kids": False,
                "do_smoke": False,
                "do_drink": False,
                "interests": [2, 1],
                "bio": """Mauris a vestibulum nisi. Proin interdum massa ornare convallis efficitur. Praesent viverra accumsan lectus, et porttitor mi feugiat vel. Curabitur tristique placerat leo, molestie sodales elit dictum ac. Sed convallis mauris et aliquet sollicitudin. Sed sed arcu in lorem semper dignissim aliquet quis lacus. Maecenas consequat velit quis varius lobortis. Suspendisse pellentesque semper ante, nec ultrices magna mollis non.
            Nullam vestibulum magna ac lectus lobortis dictum. Praesent sed mauris egestas, varius lorem ut, aliquam purus. Donec ut ipsum fermentum, vehicula eros sollicitudin, malesuada lorem. Pellentesque fringilla placerat nibh non condimentum. Integer ultricies nunc quis enim placerat lobortis. Cras accumsan ligula quis quam blandit sodales. Etiam mattis ipsum enim, eu lobortis arcu lobortis a. Morbi eget facilisis tellus. Quisque condimentum eleifend augue, sit amet dictum purus aliquet ut. Fusce non tortor sit amet nunc iaculis posuere.""",
                "profile_photo": io.BytesIO().getvalue(),
                "photos": [io.BytesIO().getvalue(), io.BytesIO().getvalue(), io.BytesIO().getvalue()],
                "ideal_partner_details": """Mauris a vestibulum nisi. Proin interdum massa ornare convallis efficitur. Praesent viverra accumsan lectus, et porttitor mi feugiat vel. Curabitur tristique placerat leo, molestie sodales elit dictum ac. Sed convallis mauris et aliquet sollicitudin. Sed sed arcu in lorem semper dignissim aliquet quis lacus. Maecenas consequat velit quis varius lobortis. Suspendisse pellentesque semper ante, nec ultrices magna mollis non.
            Nullam vestibulum magna ac lectus lobortis dictum. Praesent sed mauris egestas, varius lorem ut, aliquam purus. Donec ut ipsum fermentum, vehicula eros sollicitudin, malesuada lorem. Pellentesque fringilla placerat nibh non condimentum. Integer ultricies nunc quis enim placerat lobortis. Cras accumsan ligula quis quam blandit sodales. Etiam mattis ipsum enim, eu lobortis arcu lobortis a. Morbi eget facilisis tellus. Quisque condimentum eleifend augue, sit amet dictum purus aliquet ut. Fusce non tortor sit amet nunc iaculis posuere.""",
            }
        }


class UpdatePasswordModel(BaseModel):
    email: str
    current_password: str
    new_password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "aaa@gmail.com",
                "current_password": 12345678,
                "new_password": 123456777
            }
        }


class LoginModel(BaseModel):
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "aaa@gmail.com",
                "password": 12345678,
            }
        }
