# 🚀 TPConnect - Complete From-Scratch Installation & Execution Guide

## 📋 STEP 0: Prerequisites Check

### 0.1: Check Python
```bash
python3 --version
```
**Expected:** Python 3.11+ (You have: 3.12.3 ✅)

### 0.2: Check Node.js
```bash
node --version
```
**Expected:** Node.js 18+ (You have: v18.19.1 ✅)

### 0.3: Check if SQLite is installed
```bash
sqlite3 --version
```
**If not installed:**
```bash
sudo apt-get update
sudo apt-get install sqlite3

---

## ✅ STEP 1: Setup Backend

### 1.1: Go to Backend Directory
```bash
cd /home/t9ja5/projects/tpconnect/backend
```

### 1.2: Create Virtual Environment
```bash
python3 -m venv venv
```
**Expected:** Creates `venv` folder

### 1.3: Activate Virtual Environment
```bash
source venv/bin/activate
```
**Expected:** `(venv)` appears in prompt

### 1.4: Install All Dependencies
```bash
pip install -r requirements.txt
```
**Expected:** Installs ~35 packages (takes 30-60 seconds)

### 1.5: Install email-validator
```bash
pip install email-validator
```
**Expected:** Successfully installed email-validator-2.1.0

### 1.6: Create .env File
```bash
cat > .env << 'EOF'
DATABASE_URL=sqlite:///./tpconnect.db
SECRET_KEY=your-secret-key-change-in-production-use-openssl-rand-hex-32
EOF
```

### 1.7: Verify .env Created
```bash
cat .env
```
**Expected:**
```
DATABASE_URL=sqlite:///./tpconnect.db
SECRET_KEY=your-secret-key-change-in-production-use-openssl-rand-hex-32
```

---

## ✅ STEP 2: Start Backend

### 2.1: Start Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [7406] using WatchFiles
INFO:     Started server process [7407]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

✅ **Backend Running:** http://localhost:8000

### 2.2: Test Backend (New Terminal)
```bash
curl http://localhost:8000
```
**Expected:** `{"message":"TPConnect API is running"}`

### 2.3: Check API Docs in Browser
Open: **http://localhost:8000/docs**

**You'll See:** Swagger UI with 24 endpoints

---

## ✅ STEP 3: Check Database Created

### 3.1: Open New Terminal
```bash
cd /home/t9ja5/projects/tpconnect/backend
```

### 3.2: Check Database File Exists
```bash
ls -lh tpconnect.db
```
**Expected:** File exists (~20KB)

### 3.3: Check Tables Created
```bash
sqlite3 tpconnect.db ".tables"
```
**Expected:**
```
applications  companies  interviews  jobs  results  students  users
```

✅ **7 Tables Created Automatically!**

### 3.4: View Users Table Structure
```bash
sqlite3 tpconnect.db ".schema users"
```
**Expected:** Shows CREATE TABLE statement

### 3.5: Check All Tables
```bash
sqlite3 tpconnect.db << 'EOF'
.mode column
.headers on
SELECT name FROM sqlite_master WHERE type='table';
EOF
```
**Expected:** Lists all 7 tables

---

## ✅ STEP 4: Setup Frontend

### 4.1: Open New Terminal
```bash
cd /home/t9ja5/projects/tpconnect/frontend
```

### 4.2: Install Dependencies
```bash
npm install
```
**Expected:** Installs ~324 packages (takes 1-2 minutes)

### 4.3: Create .env.local
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### 4.4: Verify .env.local
```bash
cat .env.local
```
**Expected:** `NEXT_PUBLIC_API_URL=http://localhost:8000`

---

## ✅ STEP 5: Start Frontend

### 5.1: Start Server
```bash
npm run dev
```

**Expected Output:**
```
> tpconnect-frontend@1.0.0 dev
> next dev

   ▲ Next.js 14.1.0
   - Local:        http://localhost:3000

 ✓ Ready in 2.5s
```

✅ **Frontend Running:** http://localhost:3000

---

## ✅ STEP 6: Test Application - Register Student

### 6.1: Open Browser
Go to: **http://localhost:3000**

**You'll See:**
- "TPConnect" header
- "Start Your Journey" button
- 3 feature cards

### 6.2: Click "Get Started"

### 6.3: Fill Registration Form
```
Email: student@test.com
Password: password123
Role: Student
```

### 6.4: Click "Register"

**Result:** Redirects to dashboard with "Create Your Profile" form

### 6.5: Fill Profile Form
```
Name: John Doe
Branch: Computer Science
CGPA: 8.5
Skills: Python, JavaScript, React
Resume URL: https://example.com/resume.pdf
```

### 6.6: Click "Create Profile"

**Result:** Profile displayed with empty jobs/applications sections

---

## ✅ STEP 7: Verify Database - Student Created

### 7.1: Check Users Table
```bash
cd /home/t9ja5/projects/tpconnect/backend
sqlite3 tpconnect.db << 'EOF'
.mode column
.headers on
SELECT id, email, role FROM users;
EOF
```

**Expected:**
```
id  email              role
1   student@test.com   student
```

### 7.2: Check Students Table
```bash
sqlite3 tpconnect.db << 'EOF'
.mode column
.headers on
SELECT id, user_id, name, branch, cgpa FROM students;
EOF
```

**Expected:**
```
id  user_id  name      branch              cgpa
1   1        John Doe  Computer Science    8.5
```

✅ **Data Saved in Database!**

---

## ✅ STEP 8: Register Recruiter

### 8.1: Logout
Click "Logout" button

### 8.2: Click "Get Started"

### 8.3: Fill Form
```
Email: recruiter@test.com
Password: password123
Role: Recruiter
```

### 8.4: Click "Register"

**Result:** Dashboard with "Create Company Profile" form

### 8.5: Fill Company Form
```
Company Name: Tech Corp
Description: Leading technology company
Location: San Francisco, CA
```

### 8.6: Click "Create Company"

**Result:** Company profile displayed with "Post New Job" button

---

## ✅ STEP 9: Post a Job

### 9.1: Click "Post New Job"

### 9.2: Fill Job Form
```
Job Title: Software Engineer
Description: Full-stack developer position
Salary: $100,000 - $120,000
Job Type: Full Time
```

### 9.3: Click "Post Job"

**Result:** Job appears in "Job Postings" list

---

## ✅ STEP 10: Verify Database - Company & Job

### 10.1: Check Users
```bash
sqlite3 tpconnect.db << 'EOF'
.mode column
.headers on
SELECT id, email, role FROM users;
EOF
```

**Expected:**
```
id  email                role
1   student@test.com     student
2   recruiter@test.com   recruiter
```

### 10.2: Check Companies
```bash
sqlite3 tpconnect.db << 'EOF'
.mode column
.headers on
SELECT id, user_id, name, location FROM companies;
EOF
```

**Expected:**
```
id  user_id  name       location
1   2        Tech Corp  San Francisco, CA
```

### 10.3: Check Jobs
```bash
sqlite3 tpconnect.db << 'EOF'
.mode column
.headers on
SELECT id, company_id, title, job_type FROM jobs;
EOF
```

**Expected:**
```
id  company_id  title               job_type
1   1           Software Engineer   full_time
```

✅ **All Data Saved!**

---

## ✅ STEP 11: Apply for Job

### 11.1: Logout from Recruiter

### 11.2: Login as Student
```
Email: student@test.com
Password: password123
```

### 11.3: Click "Apply" on Software Engineer Job

**Result:** Job appears in "My Applications" with status "pending"

---

## ✅ STEP 12: Verify Application in Database

### 12.1: Check Applications Table
```bash
sqlite3 tpconnect.db << 'EOF'
.mode column
.headers on
SELECT id, student_id, job_id, status FROM applications;
EOF
```

**Expected:**
```
id  student_id  job_id  status
1   1           1       pending
```

✅ **Application Saved!**

---

## ✅ STEP 13: Register Admin

### 13.1: Logout

### 13.2: Register
```
Email: admin@test.com
Password: password123
Role: Admin
```

### 13.3: View Dashboard

**You'll See:**
- Total Students: 1
- Total Companies: 1
- Active Jobs: 1
- Students list
- Companies list

---

## ✅ STEP 14: Final Database Check

### 14.1: Count All Records
```bash
sqlite3 tpconnect.db << 'EOF'
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'students', COUNT(*) FROM students
UNION ALL
SELECT 'companies', COUNT(*) FROM companies
UNION ALL
SELECT 'jobs', COUNT(*) FROM jobs
UNION ALL
SELECT 'applications', COUNT(*) FROM applications;
EOF
```

**Expected:**
```
users|3
students|1
companies|1
jobs|1
applications|1
```

---

## ✅ STEP 15: Test API Endpoints

### 15.1: Test Health
```bash
curl http://localhost:8000/health
```
**Expected:** `{"status":"healthy"}`

### 15.2: Test Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"password123"}'
```
**Expected:** Returns access_token

### 15.3: Test Get Jobs
```bash
TOKEN=$(curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"password123"}' \
  | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

curl http://localhost:8000/jobs/ -H "Authorization: Bearer $TOKEN"
```
**Expected:** Returns job list

---

## 🎉 SUCCESS - Everything Working!

### What's Running:
- ✅ Backend: http://localhost:8000
- ✅ Frontend: http://localhost:3000
- ✅ API Docs: http://localhost:8000/docs
- ✅ Database: tpconnect.db

### What You Created:
- ✅ 3 users (student, recruiter, admin)
- ✅ 1 student profile
- ✅ 1 company
- ✅ 1 job posting
- ✅ 1 application

### Database Location:
```
/home/t9ja5/projects/tpconnect/backend/tpconnect.db
```

---

## 🔄 To Restart Later

### Terminal 1 - Backend:
```bash
cd /home/t9ja5/projects/tpconnect/backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Frontend:
```bash
cd /home/t9ja5/projects/tpconnect/frontend
npm run dev
```

---

## 🛑 To Stop

- Backend: Press `Ctrl+C`
- Frontend: Press `Ctrl+C`

---

**Status:** ✅ COMPLETE
**Time:** ~10 minutes total
**Result:** Fully functional application
