# TPConnect - Simple Step-by-Step Execution Guide

## 🚀 Running the Project - Simple Steps

### Step 1: Check Prerequisites

```bash
# Check Python version (need 3.11+)
python3 --version

# Check Node.js version (need 18+)
node --version

# Check PostgreSQL
psql --version
```

### Step 2: Setup Backend (No Database Setup Needed!)

```bash
# Go to project directory
cd /home/t9ja5/projects/tpconnect/backend

# Create virtual environment (if not exists)
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install email-validator (required)
pip install email-validator

# Create .env file
cp .env.example .env

# Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Will watch for changes in these directories: ['/home/t9ja5/projects/tpconnect/backend']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Backend is now running at:** http://localhost:8000
**API Docs available at:** http://localhost:8000/docs

### Step 3: Setup Frontend (New Terminal)

```bash
# Open NEW terminal
# Go to frontend directory
cd /home/t9ja5/projects/tpconnect/frontend

# Install dependencies (first time only)
npm install

# Create .env.local file (if not exists)
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start frontend server
npm run dev
```

**Expected Output:**
```
> tpconnect-frontend@1.0.0 dev
> next dev

   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Ready in 2.5s
```

**Frontend is now running at:** http://localhost:3000

---

## 🧪 Testing the Application

### Test 1: Register as Student

1. Open browser: http://localhost:3000
2. Click "Get Started" or "Register"
3. Fill form:
   - Email: `student@test.com`
   - Password: `password123`
   - Role: Select "Student"
4. Click "Register"
5. You'll be redirected to dashboard
6. Create your profile with:
   - Name: John Doe
   - Branch: Computer Science
   - CGPA: 8.5
   - Skills: Python, JavaScript, React

### Test 2: Register as Recruiter

1. Logout (click Logout button)
2. Go to Register page
3. Fill form:
   - Email: `recruiter@test.com`
   - Password: `password123`
   - Role: Select "Recruiter"
4. Click "Register"
5. Create company profile:
   - Company Name: Tech Corp
   - Description: Leading tech company
   - Location: San Francisco, CA
6. Post a job:
   - Title: Software Engineer
   - Description: Full-stack position
   - Salary: $100,000
   - Type: Full Time

### Test 3: Register as Admin

1. Logout
2. Register with:
   - Email: `admin@test.com`
   - Password: `password123`
   - Role: Select "Admin"
3. View dashboard with statistics
4. See all students and companies

### Test 4: Apply for Job (as Student)

1. Login as student (`student@test.com`)
2. Browse available jobs
3. Click "Apply" on Software Engineer job
4. Check "My Applications" section
5. Status should show "pending"

---

## 📊 What You Should See

### Landing Page (http://localhost:3000)
- Clean homepage with "TPConnect" branding
- "Login" and "Get Started" buttons
- Three feature cards (Students, Recruiters, Admins)

### Student Dashboard
- My Profile section
- Available Jobs list
- My Applications with status badges
- Upcoming Interviews section

### Recruiter Dashboard
- Company Profile
- Job Postings list
- "Post New Job" button
- Posted jobs display

### Admin Dashboard
- Statistics cards (Total Students, Companies, Jobs)
- Students list with details
- Companies list with details

### API Documentation (http://localhost:8000/docs)
- Interactive Swagger UI
- All 24 endpoints listed
- Try out features directly

---

## 🛑 Stopping the Application

### Stop Backend
- Go to backend terminal
- Press `CTRL + C`

### Stop Frontend
- Go to frontend terminal
- Press `CTRL + C`

---

## 🔄 Restarting the Application

### Quick Restart

**Terminal 1 (Backend):**
```bash
cd /home/t9ja5/projects/tpconnect/backend
source venv/bin/activate
uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd /home/t9ja5/projects/tpconnect/frontend
npm run dev
```

---

## ✅ Success Indicators

### Backend Running Successfully:
- ✅ No error messages in terminal
- ✅ Can access http://localhost:8000
- ✅ Can access http://localhost:8000/docs
- ✅ See "Application startup complete" message

### Frontend Running Successfully:
- ✅ No error messages in terminal
- ✅ Can access http://localhost:3000
- ✅ See "Ready in X.Xs" message
- ✅ Pages load without errors

### Database Working:
- ✅ Backend connects without errors
- ✅ Can register users
- ✅ Data persists after refresh

---

## 🐛 Common Issues

### Issue: Port 8000 already in use
```bash
# Kill the process
lsof -ti:8000 | xargs kill -9
```

### Issue: Port 3000 already in use
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9
```

### Issue: Database doesn't exist
```bash
# No action needed - SQLite creates automatically
```

### Issue: email-validator not found
```bash
cd backend
source venv/bin/activate
pip install email-validator
```

### Issue: Module not found (Backend)
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Issue: Module not found (Frontend)
```bash
cd frontend
rm -rf node_modules
npm install
```

---

## 📝 Quick Reference

| What | URL |
|------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| Database | localhost:5432 |

| Action | Command |
|--------|---------|
| Start Backend | `cd backend && source venv/bin/activate && uvicorn main:app --reload` |
| Start Frontend | `cd frontend && npm run dev` |
| Stop Server | `CTRL + C` |
| Check Logs | Look at terminal output |

---

**Project Status:** ✅ Ready to Run
**Last Updated:** March 2024
