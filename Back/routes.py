#!/usr/bin/env python
from fastapi import APIRouter
from .auth import router as auth_user
from .chats import router as chats

router = APIRouter()
router.include_router(auth_user, prefix = "/auth", tags=["auth"])
router.include_router(chats, prefix = "/chats", tags=["auth"])