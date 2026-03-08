#!/bin/bash
export DATABASE_URL="sqlite:///./tpconnect.db"
export SECRET_KEY="your-secret-key-change-in-production-use-openssl-rand-hex-32"
/home/t9ja5/projects/tpconnect/backend/venv/bin/uvicorn main:app --reload --host 0.0.0.0 --port 8000
