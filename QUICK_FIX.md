# 🚀 QUICK FIX & RUN COMMANDS

## Fix the Issues (Run these commands):

```bash
# 1. Go to backend directory
cd /home/t9ja5/projects/tpconnect/backend

# 2. Activate virtual environment
source venv/bin/activate

# 3. Install missing package
pip install email-validator

# 4. Update .env file to use SQLite
cat > .env << 'EOF'
DATABASE_URL=sqlite:///./tpconnect.db
SECRET_KEY=your-secret-key-change-in-production-use-openssl-rand-hex-32
EOF

# 5. Start backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Then in NEW Terminal - Start Frontend:

```bash
# 1. Go to frontend directory
cd /home/t9ja5/projects/tpconnect/frontend

# 2. Start frontend
npm run dev
```

## Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## OR Use the Fix Script:

```bash
cd /home/t9ja5/projects/tpconnect
./fix.sh
```

Then start the backend:
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
