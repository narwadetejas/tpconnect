# 🚀 TPConnect - Complete PostgreSQL Setup Guide (From Scratch)

## 📋 STEP 0: Install Prerequisites

### 0.1: Check Python
```bash
python3 --version
```
**Expected:** Python 3.11+ ✅

### 0.2: Check Node.js
```bash
node --version
```
**Expected:** Node.js 18+ ✅

### 0.3: Check PostgreSQL
```bash
psql --version
```
**Expected:** PostgreSQL 15+ ✅

---

## ✅ STEP 1: Setup PostgreSQL Database

### 1.1: Start PostgreSQL Service
```bash
sudo service postgresql start
```
**Expected:** `* Starting PostgreSQL 16 database server`

### 1.2: Switch to postgres User
```bash
sudo -i -u postgres
```
**Expected:** Prompt changes to `postgres@hostname`

### 1.3: Create Database
```bash
createdb tpconnect
```
**Expected:** No output (success)

### 1.4: Create Database User
```bash
psql -c "CREATE USER tpconnect_user WITH PASSWORD 'password123';"
```
**Expected:** `CREATE ROLE`

### 1.5: Grant Privileges
```bash
psql -c "GRANT ALL PRIVILEGES ON DATABASE tpconnect TO tpconnect_user;"
```
**Expected:** `GRANT`

### 1.6: Grant Schema Privileges
```bash
psql -d tpconnect -c "GRANT ALL ON SCHEMA public TO tpconnect_user;"
psql -d tpconnect -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tpconnect_user;"
psql -d tpconnect -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO tpconnect_user;"
```
**Expected:** `GRANT` for each command

### 1.7: Verify Database Created
```bash
psql -l | grep tpconnect
```
**Expected:**
```
tpconnect | postgres | UTF8 | ...
```

### 1.8: Exit postgres User
```bash
exit
```
**Expected:** Returns to your normal user

✅ **PostgreSQL Database Ready!**

---

## ✅ STEP 2: Setup Backend

### 2.1: Go to Backend Directory
```bash
cd /home/t9ja5/projects/tpconnect/backend
```

### 2.2: Create Virtual Environment
```bash
python3 -m venv venv
```
**Expected:** Creates `venv` folder

### 2.3: Activate Virtual Environment
```bash
source venv/bin/activate
```
**Expected:** `(venv)` appears in prompt

### 2.4: Install All Dependencies
```bash
pip install -r requirements.txt
```
**Expected:** Installs all packages including:
- fastapi
- uvicorn
- sqlalchemy
- psycopg2-binary
- alembic
- python-jose
- passlib
- pydantic
- email-validator

**Takes:** 30-60 seconds

### 2.5: Create .env File
```bash
cat > .env << 'EOF'
DATABASE_URL=postgresql://tpconnect_user:password123@localhost:5432/tpconnect
SECRET_KEY=your-secret-key-change-in-production-use-openssl-rand-hex-32
EOF
```

### 2.6: Verify .env Created
```bash
cat .env
```
**Expected:**
```
DATABASE_URL=postgresql://tpconnect_user:password123@localhost:5432/tpconnect
SECRET_KEY=your-secret-key-change-in-production-use-openssl-rand-hex-32
```

---

## ✅ STEP 3: Start Backend Server

### 3.1: Start Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Will watch for changes in these directories: ['/home/t9ja5/projects/tpconnect/backend']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process using WatchFiles
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

✅ **Backend Running:** http://localhost:8000

### 3.2: Test Backend (New Terminal)
```bash
curl http://localhost:8000
```
**Expected:** `{"message":"TPConnect API is running"}`

### 3.3: Check API Docs
Open browser: **http://localhost:8000/docs**

**You'll See:** Swagger UI with 24 endpoints

---

## ✅ STEP 4: Verify Database Tables Created

### 4.1: Connect to Database
```bash
psql -U tpconnect_user -d tpconnect -h localhost
```
**Password:** `password123`

### 4.2: List All Tables
```sql
\dt
```
**Expected:**
```
              List of relations
 Schema |     Name      | Type  |      Owner
--------+---------------+-------+-----------------
 public | applications  | table | tpconnect_user
 public | companies     | table | tpconnect_user
 public | interviews    | table | tpconnect_user
 public | jobs          | table | tpconnect_user
 public | results       | table | tpconnect_user
 public | students      | table | tpconnect_user
 public | users         | table | tpconnect_user
```

✅ **All 7 Tables Created!**

### 4.3: Check Users Table Structure
```sql
\d users
```
**Expected:** Shows table structure with columns

### 4.4: Exit psql
```sql
\q
```

---

## ✅ STEP 5: Setup Frontend

### 5.1: Open New Terminal
```bash
cd /home/t9ja5/projects/tpconnect/frontend
```

### 5.2: Install Dependencies
```bash
npm install
```
**Expected:** Installs ~324 packages (1-2 minutes)

### 5.3: Create .env.local
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### 5.4: Verify .env.local
```bash
cat .env.local
```
**Expected:** `NEXT_PUBLIC_API_URL=http://localhost:8000`

---

## ✅ STEP 6: Start Frontend

### 6.1: Start Server
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

## ✅ STEP 7: Test Application - Register Student

### 7.1: Open Browser
Go to: **http://localhost:3000**

**You'll See:**
- "TPConnect" header
- "Start Your Journey" button
- 3 feature cards

### 7.2: Click "Get Started"

### 7.3: Fill Registration Form
```
Email: student@test.com
Password: password123
Role: Student
```

### 7.4: Click "Register"

**Result:** Redirects to dashboard

### 7.5: Create Profile
```
Name: John Doe
Branch: Computer Science
CGPA: 8.5
Skills: Python, JavaScript, React
Resume URL: https://example.com/resume.pdf
```

### 7.6: Click "Create Profile"

**Result:** Profile displayed

---

## ✅ STEP 8: Verify Database - Check User Created

### 8.1: Connect to Database
```bash
psql -U tpconnect_user -d tpconnect -h localhost
```
**Password:** `password123`

### 8.2: Check Users Table
```sql
SELECT id, email, role, created_at FROM users;
```
**Expected:**
```
 id |      email       |  role   |       created_at
----+------------------+---------+---------------------
  1 | student@test.com | student | 2024-03-08 10:15:23
```

### 8.3: Check Students Table
```sql
SELECT id, user_id, name, branch, cgpa FROM students;
```
**Expected:**
```
 id | user_id |   name   |      branch       | cgpa
----+---------+----------+-------------------+------
  1 |       1 | John Doe | Computer Science  |  8.5
```

✅ **Data Saved in PostgreSQL!**

### 8.4: Exit psql
```sql
\q
```

---

## ✅ STEP 9: Register Recruiter

### 9.1: Logout from Student

### 9.2: Register as Recruiter
```
Email: recruiter@test.com
Password: password123
Role: Recruiter
```

### 9.3: Create Company
```
Company Name: Tech Corp
Description: Leading technology company
Location: San Francisco, CA
```

---

## ✅ STEP 10: Post a Job

### 10.1: Click "Post New Job"

### 10.2: Fill Form
```
Job Title: Software Engineer
Description: Full-stack developer position
Salary: $100,000 - $120,000
Job Type: Full Time
```

### 10.3: Click "Post Job"

**Result:** Job appears in list

---

## ✅ STEP 11: Verify Database - Company & Job

### 11.1: Check All Users
```bash
psql -U tpconnect_user -d tpconnect -h localhost -c "SELECT id, email, role FROM users;"
```
**Password:** `password123`

**Expected:**
```
 id |       email        |   role
----+--------------------+-----------
  1 | student@test.com   | student
  2 | recruiter@test.com | recruiter
```

### 11.2: Check Companies
```bash
psql -U tpconnect_user -d tpconnect -h localhost -c "SELECT id, user_id, name, location FROM companies;"
```
**Expected:**
```
 id | user_id |   name    |     location
----+---------+-----------+------------------
  1 |       2 | Tech Corp | San Francisco, CA
```

### 11.3: Check Jobs
```bash
psql -U tpconnect_user -d tpconnect -h localhost -c "SELECT id, company_id, title, job_type FROM jobs;"
```
**Expected:**
```
 id | company_id |       title       | job_type
----+------------+-------------------+-----------
  1 |          1 | Software Engineer | full_time
```

✅ **All Data in PostgreSQL!**

---

## ✅ STEP 12: Apply for Job

### 12.1: Login as Student
```
Email: student@test.com
Password: password123
```

### 12.2: Click "Apply" on Job

**Result:** Application created

---

## ✅ STEP 13: Verify Application

### 13.1: Check Applications
```bash
psql -U tpconnect_user -d tpconnect -h localhost -c "SELECT id, student_id, job_id, status FROM applications;"
```
**Expected:**
```
 id | student_id | job_id | status
----+------------+--------+---------
  1 |          1 |      1 | pending
```

✅ **Application Saved!**

---

## ✅ STEP 14: Register Admin

### 14.1: Register
```
Email: admin@test.com
Password: password123
Role: Admin
```

### 14.2: View Dashboard

**You'll See:**
- Total Students: 1
- Total Companies: 1
- Active Jobs: 1

---

## ✅ STEP 15: Final Database Verification

### 15.1: Count All Records
```bash
psql -U tpconnect_user -d tpconnect -h localhost << 'EOF'
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
**Password:** `password123`

**Expected:**
```
 table_name  | count
-------------+-------
 users       |     3
 students    |     1
 companies   |     1
 jobs        |     1
 applications|     1
```

---

## 🎉 SUCCESS - PostgreSQL Setup Complete!

### What's Running:
- ✅ PostgreSQL Database: localhost:5432
- ✅ Backend API: http://localhost:8000
- ✅ Frontend: http://localhost:3000
- ✅ API Docs: http://localhost:8000/docs

### Database Info:
- **Database:** tpconnect
- **User:** tpconnect_user
- **Password:** password123
- **Host:** localhost
- **Port:** 5432

### What You Created:
- ✅ 3 users (student, recruiter, admin)
- ✅ 1 student profile
- ✅ 1 company
- ✅ 1 job posting
- ✅ 1 application

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
- PostgreSQL: `sudo service postgresql stop`

---

## 📝 Quick Database Commands

### Connect to Database:
```bash
psql -U tpconnect_user -d tpconnect -h localhost
```

### List Tables:
```sql
\dt
```

### View Table Data:
```sql
SELECT * FROM users;
SELECT * FROM students;
SELECT * FROM companies;
SELECT * FROM jobs;
SELECT * FROM applications;
```

### Exit:
```sql
\q
```

---

**Status:** ✅ COMPLETE WITH POSTGRESQL
**Database:** PostgreSQL 16
**All Features:** WORKING
