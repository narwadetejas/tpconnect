# TPConnect - Project Overview

## 🎯 What is TPConnect?

TPConnect is a comprehensive Training & Placement management portal designed for colleges to streamline their placement processes. It connects students, recruiters, and placement administrators in one unified platform.

## 🏗️ Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Custom ShadCN-inspired UI components
- **State Management**: React Context API (useAuth)
- **API Communication**: Axios

### Backend (FastAPI)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT (JSON Web Tokens)
- **Migrations**: Alembic
- **API Style**: RESTful

### Database Schema
```
users (id, email, password, role, created_at)
  ↓
students (id, user_id, name, branch, cgpa, skills, resume_url)
companies (id, user_id, name, description, location)
  ↓
jobs (id, company_id, title, description, salary, job_type, deadline)
  ↓
applications (id, student_id, job_id, status, applied_at)
  ↓
interviews (id, application_id, round, date, location)
results (id, student_id, job_id, result_status, created_at)
```

## 👥 User Roles & Capabilities

### 1. Student
- ✅ Register and create profile
- ✅ Upload resume and add skills
- ✅ Browse job/internship listings
- ✅ Apply for positions
- ✅ Track application status (pending/shortlisted/rejected/selected)
- ✅ View scheduled interviews
- ✅ Check placement results

### 2. Recruiter (Company)
- ✅ Register and create company profile
- ✅ Post job openings (full-time/internship)
- ✅ View list of applicants
- ✅ Shortlist candidates
- ✅ Manage job postings

### 3. Admin (Placement Cell)
- ✅ View all students and companies
- ✅ Manage placement drives
- ✅ Schedule interviews
- ✅ Update application statuses
- ✅ Publish results
- ✅ Dashboard with analytics

## 🔐 Authentication Flow

1. User registers with email, password, and role
2. Backend hashes password and creates user
3. JWT token generated and returned
4. Frontend stores token in localStorage
5. Token included in Authorization header for protected routes
6. Backend validates token and extracts user info
7. Role-based access control enforced

## 📊 Key Features

### Dashboard Views
- **Student Dashboard**: Profile, available jobs, applications, interviews
- **Recruiter Dashboard**: Company profile, job postings, applicants
- **Admin Dashboard**: Statistics, student management, company management

### Application Workflow
1. Student applies for job
2. Application status: PENDING
3. Recruiter/Admin reviews → SHORTLISTED/REJECTED
4. Admin schedules interview
5. Admin publishes result → SELECTED/REJECTED/WAITLISTED

## 🚀 Running the Application

### Quick Start (Recommended)
```bash
./setup.sh
```

### Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 3 - Database (if not running):**
```bash
# Start PostgreSQL service
# Create database: createdb tpconnect
```

### Docker Start
```bash
docker-compose up --build
```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: localhost:5432

## 📁 File Structure Explained

```
tpconnect/
├── backend/
│   ├── app/
│   │   ├── routers/          # API route handlers
│   │   │   ├── auth.py       # Login/Register
│   │   │   ├── students.py   # Student CRUD
│   │   │   ├── companies.py  # Company CRUD
│   │   │   ├── jobs.py       # Job postings
│   │   │   ├── applications.py
│   │   │   ├── interviews.py
│   │   │   └── results.py
│   │   ├── models/
│   │   │   └── models.py     # SQLAlchemy models
│   │   ├── schemas/
│   │   │   └── schemas.py    # Pydantic schemas
│   │   ├── auth/
│   │   │   └── jwt.py        # JWT utilities
│   │   └── database/
│   │       └── connection.py # DB connection
│   └── main.py               # FastAPI app entry
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Landing page
│   │   ├── layout.tsx        # Root layout
│   │   ├── login/page.tsx    # Login page
│   │   ├── register/page.tsx # Register page
│   │   └── dashboard/page.tsx # Main dashboard
│   ├── components/ui/        # Reusable components
│   ├── services/api.ts       # API service layer
│   ├── hooks/useAuth.tsx     # Auth context
│   └── lib/utils.ts          # Utilities
│
└── docker-compose.yml        # Docker orchestration
```

## 🔧 Configuration

### Backend Environment (.env)
```
DATABASE_URL=postgresql://user:pass@host:port/db
SECRET_KEY=your-secret-key
```

### Frontend Environment (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🧪 Testing the Application

1. **Register as Student**
   - Go to http://localhost:3000/register
   - Select "Student" role
   - Create profile with name, branch, CGPA, skills

2. **Register as Recruiter**
   - Register with "Recruiter" role
   - Create company profile
   - Post a job opening

3. **Register as Admin**
   - Register with "Admin" role
   - View all students and companies
   - Manage applications and schedule interviews

4. **Student Workflow**
   - Login as student
   - Browse jobs
   - Apply for a job
   - Check application status

5. **Recruiter Workflow**
   - Login as recruiter
   - View applicants for your jobs
   - Shortlist candidates

6. **Admin Workflow**
   - Login as admin
   - View dashboard statistics
   - Schedule interviews
   - Publish results

## 🎨 UI Components

All components follow ShadCN design principles:
- **Button**: Multiple variants (default, outline, ghost, etc.)
- **Card**: Container for content sections
- **Input**: Form input fields
- **Responsive**: Mobile-first design

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control (RBAC)
- Protected API routes
- CORS configuration
- SQL injection prevention (SQLAlchemy ORM)

## 📈 Future Enhancements

- Email notifications
- Resume upload to cloud storage
- Advanced search and filters
- Analytics charts (using Recharts)
- Export reports (PDF/Excel)
- Real-time notifications
- Video interview integration
- Bulk operations for admin

## 🐛 Troubleshooting

**Database connection error:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists: `createdb tpconnect`

**Frontend can't connect to backend:**
- Check NEXT_PUBLIC_API_URL in .env.local
- Ensure backend is running on port 8000
- Check CORS settings in main.py

**Module not found errors:**
- Backend: Activate venv and reinstall: `pip install -r requirements.txt`
- Frontend: Reinstall: `rm -rf node_modules && npm install`

## 📝 API Examples

**Register:**
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"pass123","role":"student"}'
```

**Login:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"pass123"}'
```

**Get Jobs (with auth):**
```bash
curl http://localhost:8000/jobs/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🤝 Contributing

This is a production-ready template. Feel free to:
- Add more features
- Improve UI/UX
- Add tests
- Enhance security
- Optimize performance

## 📄 License

MIT License - Free to use for educational and commercial purposes.
