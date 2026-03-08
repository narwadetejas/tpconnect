#!/bin/bash
cd /home/t9ja5/projects/tpconnect/backend
export DATABASE_URL="sqlite:///./tpconnect.db"
export SECRET_KEY="your-secret-key-change-in-production-use-openssl-rand-hex-32"
exec /home/t9ja5/projects/tpconnect/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
