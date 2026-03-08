# TPConnect - Training & Placement Portal

A production-ready SaaS application for managing college placements, internships, and recruitment processes.

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- ShadCN UI components

### Backend
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy ORM
- Alembic (migrations)
- JWT Authentication

### Deployment
- Docker & Docker Compose
- Environment-based configuration

## Features

### Student Features
- Create and manage profile
- Upload resume
- Browse job/internship listings
- Apply for positions
- Track application status
- View interview schedules
- Check results

### Admin Features
- Manage students
- Manage companies
- Post jobs/internships
- Shortlist candidates
- Schedule interviews
- Publish results
- Dashboard analytics

### Recruiter Features
- Create company profile
- Post job openings
- View applicants
- Shortlist students
- Upload results

## Project Structure

```
tpconnect/
├── backend/
│   ├── app/
│   │   ├── routers/          # API endpoints
│   │   ├── models/           # Database models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── auth/             # JWT authentication
│   │   └── database/         # Database connection
│   ├── main.py               # FastAPI app
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── app/                  # Next.js pages
│   ├── components/           # React components
│   ├── services/             # API services
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities
│   └── Dockerfile
└── docker-compose.yml
```

## Local Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Option 1: Manual Setup

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Update `.env` with your database credentials:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tpconnect
SECRET_KEY=your-secret-key-here
```

6. Create database:
```bash
createdb tpconnect
```

7. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000
API docs at: http://localhost:8000/docs

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run development server:
```bash
npm run dev
```

Frontend will be available at: http://localhost:3000

### Option 2: Docker Setup

1. From project root, run:
```bash
docker-compose up --build
```

This will start:
- PostgreSQL on port 5432
- Backend API on port 8000
- Frontend on port 3000

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Students
- `POST /students/` - Create student profile
- `GET /students/me` - Get my profile
- `PUT /students/me` - Update my profile
- `GET /students/` - List all students (Admin only)

### Companies
- `POST /companies/` - Create company profile
- `GET /companies/me` - Get my company
- `GET /companies/` - List all companies

### Jobs
- `POST /jobs/` - Create job posting
- `GET /jobs/` - List all jobs
- `GET /jobs/{id}` - Get job details

### Applications
- `POST /applications/` - Apply for job
- `GET /applications/my-applications` - Get my applications
- `GET /applications/job/{job_id}` - Get job applications (Recruiter/Admin)
- `PUT /applications/{id}/status` - Update application status

### Interviews
- `POST /interviews/` - Schedule interview (Admin)
- `GET /interviews/my-interviews` - Get my interviews
- `GET /interviews/` - List all interviews (Admin)

### Results
- `POST /results/` - Publish result (Admin/Recruiter)
- `GET /results/my-results` - Get my results
- `GET /results/` - List all results (Admin)

## User Roles

1. **Student** - Can create profile, apply for jobs, view applications and interviews
2. **Recruiter** - Can create company profile, post jobs, view applicants
3. **Admin** - Full access to manage students, companies, jobs, interviews, and results

## Database Models

- **User** - Authentication and role management
- **Student** - Student profiles
- **Company** - Company profiles
- **Job** - Job/internship postings
- **Application** - Student applications
- **Interview** - Interview schedules
- **Result** - Placement results

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:port/database
SECRET_KEY=your-secret-key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Production Deployment

1. Update environment variables with production values
2. Set strong SECRET_KEY for JWT
3. Use production database credentials
4. Enable HTTPS
5. Configure CORS for production domain
6. Set up proper logging and monitoring

## Testing the Application

1. Register as a student at http://localhost:3000/register
2. Create your profile
3. Browse available jobs
4. Apply for positions
5. Register as a recruiter to post jobs
6. Register as admin to manage the platform

## License

MIT
