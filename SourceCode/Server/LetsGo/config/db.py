from pymongo import MongoClient

from LetsGo.config import settings

mongo_conn = MongoClient(settings.MONGODB_URI)
db_conn = mongo_conn[settings.MONGODB_DB_NAME]
