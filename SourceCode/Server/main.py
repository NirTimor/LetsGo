import uvicorn
from fastapi import FastAPI
from LetsGo.config import settings, db
from LetsGo.routes.userRoutes import userAPI
from LetsGo.routes.interestRoutes import interestAPI
from LetsGo.routes.futureTripRoutes import future_trip_API
from LetsGo.routes.chatRoutes import chatAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(userAPI)
app.include_router(interestAPI)
app.include_router(future_trip_API)
app.include_router(chatAPI)
origins = ["127.0.0.1", "localhost"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])


@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = db.mongo_conn
    app.database = db.db_conn


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=settings.PORT)
