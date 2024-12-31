#!/usr/bin/env python

from fastapi import APIRouter

from . import controller

router = APIRouter()


router.get("/", status_code = 200)(controller.getAll)
router.post("/", status_code = 201)(controller.create)
router.get("/{chat_id}/messages/", status_code = 200)(controller.get_messages)
router.post("/{chat_id}/messages/", status_code = 201)(controller.create_message)

