import uuid
from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
from LetsGo.models.utilsModels import *


class TripCommentModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    creation_datetime: datetime = datetime.now()
    user_email: str
    name: str = ""
    text: str = ""

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "user_email": "aaa@gmail.com",
                "name": "Omer",
                "text": """Mauris a vestibulum nisi. Proin interdum massa ornare convallis efficitur. Praesent viverra accumsan lectus, et porttitor mi feugiat vel. Curabitur tristique placerat leo, molestie sodales elit dictum ac. Sed convallis mauris et aliquet sollicitudin. Sed sed arcu in lorem semper dignissim aliquet quis lacus. Maecenas consequat velit quis varius lobortis. Suspendisse pellentesque semper ante, nec ultrices magna mollis non.
Nullam vestibulum magna ac lectus lobortis dictum. Praesent sed mauris egestas, varius lorem ut, aliquam purus. Donec ut ipsum fermentum, vehicula eros sollicitudin, malesuada lorem. Pellentesque fringilla placerat nibh non condimentum. Integer ultricies nunc quis enim placerat lobortis. Cras accumsan ligula quis quam blandit sodales. Etiam mattis ipsum enim, eu lobortis arcu lobortis a. Morbi eget facilisis tellus. Quisque condimentum eleifend augue, sit amet dictum purus aliquet ut. Fusce non tortor sit amet nunc iaculis posuere.""",
            }
        }


class FutureTripModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    creation_datetime: datetime = datetime.now()
    last_update_datetime: datetime = datetime.now()
    user_email: str
    user_name: Optional[str]
    country: str = Field(...)
    city: str = Field(...)
    duration_days: int = Field(...)
    is_flexible: bool = False
    start_month: int
    end_month: int
    details: str = Field(...)
    likes: int = 0
    liked_users: list[str] = []
    favorites_users: list[str] = []
    comments: list[TripCommentModel] = []
    photos: list[str] = []

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "creation_datetime": datetime.now(),
                "last_update_datetime": datetime.now(),
                "user_email": "aaa@gmail.com",
                "user_name": "John Cena",
                "country": "Brazil",
                "city": "rio",
                "duration_days": 0,
                "is_flexible": True,
                "start_month": 3,
                "end_month": 3,
                "details": """Mauris a vestibulum nisi. Proin interdum massa ornare convallis efficitur. Praesent viverra accumsan lectus, et porttitor mi feugiat vel. Curabitur tristique placerat leo, molestie sodales elit dictum ac. Sed convallis mauris et aliquet sollicitudin. Sed sed arcu in lorem semper dignissim aliquet quis lacus. Maecenas consequat velit quis varius lobortis. Suspendisse pellentesque semper ante, nec ultrices magna mollis non.
Nullam vestibulum magna ac lectus lobortis dictum. Praesent sed mauris egestas, varius lorem ut, aliquam purus. Donec ut ipsum fermentum, vehicula eros sollicitudin, malesuada lorem. Pellentesque fringilla placerat nibh non condimentum. Integer ultricies nunc quis enim placerat lobortis. Cras accumsan ligula quis quam blandit sodales. Etiam mattis ipsum enim, eu lobortis arcu lobortis a. Morbi eget facilisis tellus. Quisque condimentum eleifend augue, sit amet dictum purus aliquet ut. Fusce non tortor sit amet nunc iaculis posuere.""",
            }
        }


class UpdateFutureTripModel(BaseModel):
    id: str
    country: Optional[str]
    city: Optional[str]
    duration_days: Optional[int]
    is_flexible: Optional[bool]
    start_month: Optional[int]
    end_month: Optional[int]
    details: Optional[str]
    photos: list[str] = []

    class Config:
        json_schema_extra = {
            "example": {
                "country": "Brazil",
                "city": "rio",
                "duration_days": 0,
                "is_flexible": True,
                "start_month": 3,
                "end_month": 4,
                "details": """Mauris a vestibulum nisi. Proin interdum massa ornare convallis efficitur. Praesent viverra accumsan lectus, et porttitor mi feugiat vel. Curabitur tristique placerat leo, molestie sodales elit dictum ac. Sed convallis mauris et aliquet sollicitudin. Sed sed arcu in lorem semper dignissim aliquet quis lacus. Maecenas consequat velit quis varius lobortis. Suspendisse pellentesque semper ante, nec ultrices magna mollis non.
Nullam vestibulum magna ac lectus lobortis dictum. Praesent sed mauris egestas, varius lorem ut, aliquam purus. Donec ut ipsum fermentum, vehicula eros sollicitudin, malesuada lorem. Pellentesque fringilla placerat nibh non condimentum. Integer ultricies nunc quis enim placerat lobortis. Cras accumsan ligula quis quam blandit sodales. Etiam mattis ipsum enim, eu lobortis arcu lobortis a. Morbi eget facilisis tellus. Quisque condimentum eleifend augue, sit amet dictum purus aliquet ut. Fusce non tortor sit amet nunc iaculis posuere.""",
            }
        }


class FilterQueryParams(PagingParams):
    def __init__(self, skip: int = 0, limit: int = 25, asc: bool = False, country: str = None, city: str = None,
                 duration_days: int = 365, start_month: int = 1, end_month: int = 12, is_flexible: bool = None,
                 start_age_range: int = 0, end_age_range: int = 120, is_male: bool = None, interests: str = None):
        super().__init__(skip, limit, asc)
        self.country = country
        self.city = city
        self.duration_days = duration_days
        self.start_month = start_month
        self.end_month = end_month
        self.is_flexible = is_flexible
        self.start_age_range = start_age_range
        self.end_age_range = end_age_range
        self.is_male = is_male
        self.interests = interests


