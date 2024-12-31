#!/usr/bin/env python

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from back.settings import settings

engine = create_engine(settings.db_url)

SessionLocal = sessionmaker(bind = engine)

Base = declarative_base()

def get_database(): 
    """
    @DEPENDENCY \n
    @NAME: get_database \n
    @DESC: Crea y retorna una sesión para acceder a la base de datos \n
    """

    db = SessionLocal()

    try:
        yield db
    
    finally:
        db.close()