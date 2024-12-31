#!/usr/bin/env python
from fastapi import Depends, Body, Response, HTTPException
from pydantic import BaseModel

from .models import Chat, Message

from sqlalchemy import func, select, desc
from sqlalchemy.orm import Session
from back.database import get_database

from back.auth.AuthHandler import auth_handler
from back.auth.models import AuthUser

class ChatDetails(BaseModel):
    name: str

class MessageDetails(BaseModel):
    message: str


async def getAll(user_id = Depends(auth_handler.auth_wrapper), db: Session = Depends(get_database)):
    subquery = (
        select(
            Message.chat_id,
            func.count(Message.id).label("message_count")
        )
        .group_by(Message.chat_id)
        .subquery()
    )

    chats = (
        db.query(Chat, func.coalesce(subquery.c.message_count, 0).label("amount"))
        .outerjoin(subquery, Chat.id == subquery.c.chat_id)
        .filter(Chat.user_id == user_id)
        .order_by(desc(Chat.id))
    )
    return [{**chat[0].serialize(), "amount": chat[1]} for chat in chats]


async def create(user_id = Depends(auth_handler.auth_wrapper), chat_detail: ChatDetails = Body(..., media_type="application/json"), db: Session = Depends(get_database)):
    user = db.query(AuthUser).filter(AuthUser.id == user_id).first()
    if user is None:
        raise HTTPException(status_code = 404, detail = "User not found, please login again")

    chat = Chat(user_id = user_id, name = chat_detail.name)
    db.add(chat)
    db.commit()

    return {**chat.serialize(), "amount": 0}


async def get_messages(chat_id: int, user_id = Depends(auth_handler.auth_wrapper), db: Session = Depends(get_database)):
    messages = db.query(Message).join(Message.chat).filter(Message.chat_id == chat_id, Chat.user_id == user_id)
    return [message.serialize() for message in messages]


async def create_message(chat_id: int, user_id = Depends(auth_handler.auth_wrapper), message_detail: MessageDetails =  Body(..., media_type="application/json"), db: Session = Depends(get_database)):
    chat = db.query(Chat).filter(Chat.id == chat_id, Chat.user_id == user_id).first()
    if chat is None:
        raise HTTPException(status_code = 404, detail = "Chat not found")

    message = Message(
        chat_id = chat_id,
        user_message = message_detail.message,
        bot_message = f"Bot: {message_detail.message}"
    )
    db.add(message)
    db.commit()

    return message.serialize()



