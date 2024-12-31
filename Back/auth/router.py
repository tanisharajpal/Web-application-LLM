#!/usr/bin/env python

from fastapi import APIRouter

from . import controller

router = APIRouter()


router.post("/singup/", status_code = 200)(controller.singnup)
router.post("/login/", status_code = 200)(controller.login)
