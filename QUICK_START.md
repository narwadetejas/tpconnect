# TPConnect - Quick Reference Guide

## 🚀 How to Run Locally

### Option 1: Automated Setup (Recommended)
```bash
cd /home/t9ja5/projects/tpconnect
./setup.sh
```

### Option 2: Manual Setup

#### Step 1: Setup Database
```bash
# Create PostgreSQL database
createdb tpconnect
```

#### Step 2: Start Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
✅ Backend running at: http://localhost:8000
📚 API Docs at: http://localhost:8000/docs

#### Step 3: Start Frontend (New Terminal)
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```
✅ Frontend running at: http://localhost:3000

### Option 3: Docker
```bash
docker-compose up --build
```

## 📋 Complete Feature Checklist

### ✅ Authentication System
- [x] User registration with role selection
- [x] JWT-based login
- [x] Protected routes
- [x] Role-based access control
- [x] Logout functionality

### ✅ Student Features
- [x] Create/update profile
- [x] Add skills and CGPA
- [x] Browse job listings
- [x] Apply for jobs
- [x] Track application status
- [x] View interview schedules
- [x] Check results

### ✅ Recruiter Features
- [x] Create company profile
- [x] Post job openings
- [x] View applicants
- [x] Manage job postings
- [x] Filter by job type (internship/full-time)

### ✅ Admin Features
- [x] View all students
- [x] View all companies
- [x] Manage jobs
- [x] Schedule interviews
- [x] Update application status
- [x] Publish results
- [x] Dashboard with statistics

### ✅ Technical Features
- [x] RESTful API architecture
- [x] PostgreSQL database
- [x] SQLAlchemy ORM
- [x] Pydantic validation
- [x] TypeScript frontend
- [x] Responsive design
- [x] Docker support
- [x] Environment configuration
- [x] Error handling
- [x] Loading states

## 🎯 Test Scenarios

### Scenario 1: Student Journey
1. Register at `/register` with role "student"
2. Login at `/login`
3. Create profile with name, branch, CGPA, skills
4. Browse available jobs
5. Apply for a job
6. Check application status

### Scenario 2: Recruiter Journey
1. Register with role "recruiter"
2. Create company profile
3. Post a new job (title, description, salary, type)
4. View posted jobs
5. Check applicants (after students apply)

### Scenario 3: Admin Journey
1. Register with role "admin"
2. View dashboard statistics
3. See all students and companies
4. Schedule interviews for applications
5. Update application statuses
6. Publish results

## 📊 Database Models Summary

| Model | Key Fields | Purpose |
|-------|-----------|---------|
| User | email, password, role | Authentication |
| Student | name, branch, cgpa, skills | Student profiles |
| Company | name, location, description | Company profiles |
| Job | title, salary, job_type | Job postings |
| Application | student_id, job_id, status | Job applications |
| Interview | application_id, date, round | Interview schedules |
| Result | student_id, job_id, result_status | Placement results |

## 🔑 API Endpoints Quick Reference

### Auth
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user

### Students
- `POST /students/` - Create profile
- `GET /students/me` - Get my profile
- `PUT /students/me` - Update profile
- `GET /students/` - List all (admin)

### Companies
- `POST /companies/` - Create company
- `GET /companies/me` - Get my company
- `GET /companies/` - List all

### Jobs
- `POST /jobs/` - Create job
- `GET /jobs/` - List all jobs
- `GET /jobs/{id}` - Get job details

### Applications
- `POST /applications/` - Apply for job
- `GET /applications/my-applications` - My applications
- `GET /applications/job/{job_id}` - Job applications
- `PUT /applications/{id}/status` - Update status

### Interviews
- `POST /interviews/` - Schedule interview
- `GET /interviews/my-interviews` - My interviews
- `GET /interviews/` - All interviews

### Results
- `POST /results/` - Publish result
- `GET /results/my-results` - My results
- `GET /results/` - All results

## 🎨 Frontend Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Landing page | Public |
| `/login` | Login page | Public |
| `/register` | Registration page | Public |
| `/dashboard` | Role-based dashboard | Protected |

## 🔐 User Roles & Permissions

| Feature | Student | Recruiter | Admin |
|---------|---------|-----------|-------|
| Create profile | ✅ | ✅ | ✅ |
| View jobs | ✅ | ✅ | ✅ |
| Apply for jobs | ✅ | ❌ | ❌ |
| Post jobs | ❌ | ✅ | ✅ |
| View all students | ❌ | ❌ | ✅ |
| Schedule interviews | ❌ | ❌ | ✅ |
| Publish results | ❌ | ✅ | ✅ |
| Update app status | ❌ | ✅ | ✅ |

## 🛠️ Tech Stack Summary

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios

**Backend:**
- FastAPI
- Python 3.11+
- PostgreSQL
- SQLAlchemy
- JWT Auth

**DevOps:**
- Docker
- Docker Compose

## 📦 Key Dependencies

**Backend (requirements.txt):**
- fastapi
- uvicorn
- sqlalchemy
- psycopg2-binary
- python-jose
- passlib
- pydantic

**Frontend (package.json):**
- next
- react
- typescript
- tailwindcss
- axios
- lucide-react

## 🐛 Common Issues & Solutions

**Issue: Database connection failed**
```bash
# Solution: Create database
createdb tpconnect

# Or check if PostgreSQL is running
sudo service postgresql start
```

**Issue: Port already in use**
```bash
# Backend (8000)
lsof -ti:8000 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9
```

**Issue: Module not found**
```bash
# Backend
cd backend && source venv/bin/activate && pip install -r requirements.txt

# Frontend
cd frontend && rm -rf node_modules && npm install
```

**Issue: CORS error**
- Check NEXT_PUBLIC_API_URL in frontend/.env.local
- Verify CORS settings in backend/main.py

## 📈 Next Steps

1. ✅ Run the application locally
2. ✅ Test all three user roles
3. ✅ Explore API documentation at /docs
4. 🔄 Add more features (email notifications, file uploads)
5. 🔄 Add unit tests
6. 🔄 Deploy to production

## 🎓 Learning Resources

- **FastAPI**: https://fastapi.tiangolo.com/
- **Next.js**: https://nextjs.org/docs
- **SQLAlchemy**: https://docs.sqlalchemy.org/
- **Tailwind CSS**: https://tailwindcss.com/docs

## 📞 Support

For issues or questions:
1. Check README.md
2. Check PROJECT_OVERVIEW.md
3. Review API docs at /docs
4. Check backend logs
5. Check browser console

---

**Created by:** Senior Full-Stack Architect
**Version:** 1.0.0
**Last Updated:** 2024
