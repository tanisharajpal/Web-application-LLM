#!/usr/bin/env python

import os
import requests
import json
import logging

from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi import FastAPI, Depends, Response, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .settings import settings
from .routes import router as api_router
from .database import Base, engine

# Logging
log = logging.getLogger("fastapi")

# Create database
Base.metadata.create_all(bind=engine)

# Create server
app = FastAPI(debug=True, docs_url="/index.html")

# CORS config
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)
# app.middleware("http")(response_handler)

log.info("Starting server")

# docs endpoint
app.add_api_route("/", endpoint=lambda: RedirectResponse(url="/index.html"), include_in_schema=False)
app.add_api_route("/docs", endpoint=lambda: RedirectResponse(url="/index.html"), include_in_schema=False)

# api routes
app.include_router(api_router, prefix = "/api")


