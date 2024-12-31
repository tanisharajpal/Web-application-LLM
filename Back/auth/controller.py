#!/usr/bin/env python
from fastapi import Depends, Response, HTTPException
from pydantic import BaseModel

from .models import AuthUser

from sqlalchemy.orm import Session
from back.database import get_database

from .AuthHandler import auth_handler

class AuthDetails(BaseModel):
    username: str
    password: str


class RegisterAuthDetails(BaseModel):
    username: str
    password: str


def get_auth_user_by_username(db: Session, username: str) -> AuthUser:
    return db.query(AuthUser).filter(AuthUser.username == username).first()


def create_auth_user(db: Session, auth_user: dict) -> AuthUser:
    db_auth_user = AuthUser(
        username = auth_user.get("username"),
        password = auth_user.get("password")
    )

    db.add(db_auth_user)
    db.commit()
    db.refresh(db_auth_user)

    return db_auth_user


async def singnup(auth_details: RegisterAuthDetails, db: Session = Depends(get_database)):
    if get_auth_user_by_username(db, auth_details.username):
        raise HTTPException(status_code=400, detail="Username is taken")

    hashed_password = auth_handler.get_password_hash(auth_details.password)
    
    create_auth_user(db, {
        "username": auth_details.username,
        "password": hashed_password    
    })

    auth_user_data = get_auth_user_by_username(db, auth_details.username)
    token = auth_handler.encode_token(auth_user_data.id)
    return {"token": token, "token_type": "bearer"}


async def login(auth_details: AuthDetails, db: Session = Depends(get_database)):
    auth_user_data = get_auth_user_by_username(db, auth_details.username)
    
    if (auth_user_data is None) or (not auth_handler.verify_password(auth_details.password, auth_user_data.password)):
        raise HTTPException(status_code=401, detail="Invalid username and/or password")

    token = auth_handler.encode_token(auth_user_data.id)
    return {"token": token, "token_type": "bearer"}

    