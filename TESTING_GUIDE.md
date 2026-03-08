# TPConnect - Complete Testing Guide

## Prerequisites

1. **PostgreSQL Running**
   ```bash
   sudo service postgresql start
   # OR
   brew services start postgresql
   ```

2. **Database Created**
   ```bash
   createdb tpconnect
   ```

## Setup Instructions

### Option 1: Automated Setup (Recommended)
```bash
cd /home/t9ja5/projects/tpconnect
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

#### Backend
```bash
cd /home/t9ja5/projects/tpconnect/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend (New Terminal)
```bash
cd /home/t9ja5/projects/tpconnect/frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

### Option 3: Docker
```bash
cd /home/t9ja5/projects/tpconnect
docker-compose up --build
```

## Testing Scenarios

### Test 1: Student Complete Journey

1. **Register as Student**
   - Go to: http://localhost:3000/register
   - Email: `student1@test.com`
   - Password: `password123`
   - Role: `Student`
   - Click "Register"

2. **Create Student Profile**
   - Name: `John Doe`
   - Branch: `Computer Science`
   - CGPA: `8.5`
   - Skills: `Python, JavaScript, React, FastAPI`
   - Resume URL: `https://example.com/resume.pdf`
   - Click "Create Profile"

3. **Browse Jobs**
   - View available job listings
   - Check job details (title, company, salary, type)

4. **Apply for Job**
   - Click "Apply" on any job
   - Verify application appears in "My Applications"
   - Check status is "pending"

5. **View Interviews**
   - Check "Upcoming Interviews" section
   - (Will be empty until admin schedules)

6. **Logout**
   - Click "Logout" button

### Test 2: Recruiter Complete Journey

1. **Register as Recruiter**
   - Go to: http://localhost:3000/register
   - Email: `recruiter1@test.com`
   - Password: `password123`
   - Role: `Recruiter`
   - Click "Register"

2. **Create Company Profile**
   - Company Name: `Tech Corp`
   - Description: `Leading technology company`
   - Location: `San Francisco, CA`
   - Click "Create Company"

3. **Post a Job**
   - Click "Post New Job"
   - Job Title: `Software Engineer`
   - Description: `Full-stack developer position`
   - Salary: `$100,000 - $120,000`
   - Job Type: `Full Time`
   - Click "Post Job"

4. **Post an Internship**
   - Click "Post New Job"
   - Job Title: `Summer Internship`
   - Description: `3-month internship program`
   - Salary: `$5,000/month`
   - Job Type: `Internship`
   - Click "Post Job"

5. **View Job Postings**
   - Verify both jobs appear in the list

6. **Logout**

### Test 3: Admin Complete Journey

1. **Register as Admin**
   - Go to: http://localhost:3000/register
   - Email: `admin@test.com`
   - Password: `password123`
   - Role: `Admin`
   - Click "Register"

2. **View Dashboard Statistics**
   - Check "Total Students" count
   - Check "Total Companies" count
   - Check "Active Jobs" count

3. **View All Students**
   - Scroll to "Students" section
   - Verify student profiles are listed
   - Check student details (name, branch, CGPA)

4. **View All Companies**
   - Scroll to "Companies" section
   - Verify company profiles are listed
   - Check company details (name, location)

5. **Logout**

### Test 4: Application Workflow

1. **Login as Student** (`student1@test.com`)
   - Apply for the "Software Engineer" job
   - Verify application status is "pending"

2. **Login as Admin** (`admin@test.com`)
   - View applications (need to implement view in UI)
   - Update application status to "shortlisted"

3. **Login as Student** (`student1@test.com`)
   - Check application status changed to "shortlisted"

### Test 5: API Testing (Using curl or Postman)

#### Register
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

#### Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Get Jobs (with token)
```bash
curl http://localhost:8000/jobs/ \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Verification Checklist

### Backend Verification
- [ ] Backend starts without errors on port 8000
- [ ] API docs accessible at http://localhost:8000/docs
- [ ] Database connection successful
- [ ] All endpoints return proper responses
- [ ] JWT authentication works
- [ ] Role-based access control enforced

### Frontend Verification
- [ ] Frontend starts without errors on port 3000
- [ ] Landing page loads correctly
- [ ] Registration works for all roles
- [ ] Login works with correct credentials
- [ ] Dashboard loads based on user role
- [ ] All forms submit successfully
- [ ] Data displays correctly from API

### Database Verification
```bash
# Connect to database
psql tpconnect

# Check tables
\dt

# Should show:
# - users
# - students
# - companies
# - jobs
# - applications
# - interviews
# - results

# Check user data
SELECT * FROM users;

# Check student data
SELECT * FROM students;

# Exit
\q
```

### Docker Verification
- [ ] `docker-compose up` starts all services
- [ ] PostgreSQL container running
- [ ] Backend container running
- [ ] Frontend container running
- [ ] All services accessible

## Common Issues & Solutions

### Issue: Database connection error
```bash
# Solution: Ensure PostgreSQL is running
sudo service postgresql start

# Create database if not exists
createdb tpconnect
```

### Issue: Port already in use
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
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
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS error
- Check `NEXT_PUBLIC_API_URL` in frontend/.env.local
- Verify CORS settings in backend/main.py

## Performance Testing

### Load Testing (Optional)
```bash
# Install Apache Bench
sudo apt-get install apache2-utils

# Test login endpoint
ab -n 100 -c 10 -p login.json -T application/json http://localhost:8000/auth/login
```

## Security Testing

### Checklist
- [ ] Passwords are hashed (not stored in plain text)
- [ ] JWT tokens expire after 24 hours
- [ ] Protected routes require authentication
- [ ] Role-based access control works
- [ ] SQL injection prevented (using ORM)
- [ ] CORS configured properly

## Success Criteria

✅ All three user roles can register and login
✅ Students can create profiles and apply for jobs
✅ Recruiters can create companies and post jobs
✅ Admins can view all data and manage the system
✅ Application status workflow works
✅ No console errors in browser
✅ No server errors in terminal
✅ Database tables created automatically
✅ Docker setup works

## Next Steps After Testing

1. Add email notifications
2. Implement file upload for resumes
3. Add search and filter functionality
4. Create analytics charts
5. Add export functionality (PDF/Excel)
6. Implement real-time notifications
7. Add unit and integration tests
8. Deploy to production

## Support

If you encounter any issues:
1. Check the logs in terminal
2. Check browser console for errors
3. Verify environment variables
4. Ensure all dependencies are installed
5. Check database connection
6. Review API documentation at /docs
