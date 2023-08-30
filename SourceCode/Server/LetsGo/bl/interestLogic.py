from LetsGo.config.settings import INTEREST_TABLE_NAME
from LetsGo.config.db import db_conn
from LetsGo.models.interestModels import InterestModel

interest_table = db_conn[INTEREST_TABLE_NAME]


def get_interests_bl():
    return list(interest_table.find())


def create_interest_bl(new_interest: InterestModel):
    new_interest_feedback = interest_table.insert_one(new_interest)
    created_trip = interest_table.find_one(
        {"_id": new_interest_feedback.inserted_id}
    )
    return created_trip

