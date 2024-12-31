# app/config.py

from pydantic import BaseSettings, Field
import os

class Settings(BaseSettings):
    db_url: str = Field(f"postgresql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@db:5432/{os.getenv('DB_NAME')}", env='DATABASE_URL')
    host: str = Field("0.0.0.0", env='HOST')
    port: int = Field(5000, env='PORT')

settings = Settings()