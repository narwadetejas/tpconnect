# TPConnect API Documentation

Base URL: `http://localhost:8000`

Interactive API Docs: `http://localhost:8000/docs`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "student"  // Options: "student", "recruiter", "admin"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "role": "student"
}
```

**Errors:**
- `400 Bad Request` - Email already registered

---

### Login
**POST** `/auth/login`

Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "role": "student"
}
```

**Errors:**
- `401 Unauthorized` - Incorrect email or password

---

## Student Endpoints

### Create Student Profile
**POST** `/students/`

Create a student profile (Student role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Doe",
  "branch": "Computer Science",
  "cgpa": 8.5,
  "skills": "Python, JavaScript, React",
  "resume_url": "https://example.com/resume.pdf"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "name": "John Doe",
  "branch": "Computer Science",
  "cgpa": 8.5,
  "skills": "Python, JavaScript, React",
  "resume_url": "https://example.com/resume.pdf"
}
```

**Errors:**
- `400 Bad Request` - Profile already exists
- `401 Unauthorized` - Invalid or missing token
- `403 Forbidden` - Insufficient permissions

---

### Get My Profile
**GET** `/students/me`

Get current student's profile (Student role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "name": "John Doe",
  "branch": "Computer Science",
  "cgpa": 8.5,
  "skills": "Python, JavaScript, React",
  "resume_url": "https://example.com/resume.pdf"
}
```

**Errors:**
- `404 Not Found` - Profile not found

---

### Update My Profile
**PUT** `/students/me`

Update current student's profile (Student role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** (All fields optional)
```json
{
  "name": "John Updated",
  "branch": "Computer Science",
  "cgpa": 9.0,
  "skills": "Python, JavaScript, React, Node.js",
  "resume_url": "https://example.com/new-resume.pdf"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "name": "John Updated",
  "branch": "Computer Science",
  "cgpa": 9.0,
  "skills": "Python, JavaScript, React, Node.js",
  "resume_url": "https://example.com/new-resume.pdf"
}
```

---

### List All Students
**GET** `/students/`

Get list of all students (Admin role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "John Doe",
    "branch": "Computer Science",
    "cgpa": 8.5,
    "skills": "Python, JavaScript, React",
    "resume_url": "https://example.com/resume.pdf"
  },
  {
    "id": 2,
    "user_id": 2,
    "name": "Jane Smith",
    "branch": "Information Technology",
    "cgpa": 9.0,
    "skills": "Java, Spring Boot, MySQL",
    "resume_url": "https://example.com/jane-resume.pdf"
  }
]
```

---

## Company Endpoints

### Create Company Profile
**POST** `/companies/`

Create a company profile (Recruiter or Admin role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Tech Corp",
  "description": "Leading technology company",
  "location": "San Francisco, CA"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "name": "Tech Corp",
  "description": "Leading technology company",
  "location": "San Francisco, CA"
}
```

**Errors:**
- `400 Bad Request` - Company profile already exists (for recruiters)

---

### Get My Company
**GET** `/companies/me`

Get current recruiter's company (Recruiter role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "user_id": 1,
  "name": "Tech Corp",
  "description": "Leading technology company",
  "location": "San Francisco, CA"
}
```

---

### List All Companies
**GET** `/companies/`

Get list of all companies (All authenticated users).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "name": "Tech Corp",
    "description": "Leading technology company",
    "location": "San Francisco, CA"
  },
  {
    "id": 2,
    "user_id": 2,
    "name": "Innovation Labs",
    "description": "AI and ML solutions",
    "location": "New York, NY"
  }
]
```

---

## Job Endpoints

### Create Job Posting
**POST** `/jobs/`

Create a new job posting (Recruiter or Admin role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Software Engineer",
  "description": "Full-stack developer position",
  "salary": "$100,000 - $120,000",
  "job_type": "full_time",  // Options: "full_time", "internship"
  "deadline": "2024-12-31T23:59:59"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "company_id": 1,
  "title": "Software Engineer",
  "description": "Full-stack developer position",
  "salary": "$100,000 - $120,000",
  "job_type": "full_time",
  "deadline": "2024-12-31T23:59:59",
  "created_at": "2024-03-07T10:00:00",
  "company": null
}
```

**Errors:**
- `404 Not Found` - Company profile not found

---

### List All Jobs
**GET** `/jobs/`

Get list of all job postings (All authenticated users).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "company_id": 1,
    "title": "Software Engineer",
    "description": "Full-stack developer position",
    "salary": "$100,000 - $120,000",
    "job_type": "full_time",
    "deadline": "2024-12-31T23:59:59",
    "created_at": "2024-03-07T10:00:00",
    "company": {
      "id": 1,
      "user_id": 1,
      "name": "Tech Corp",
      "description": "Leading technology company",
      "location": "San Francisco, CA"
    }
  }
]
```

---

### Get Job Details
**GET** `/jobs/{job_id}`

Get details of a specific job (All authenticated users).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "company_id": 1,
  "title": "Software Engineer",
  "description": "Full-stack developer position",
  "salary": "$100,000 - $120,000",
  "job_type": "full_time",
  "deadline": "2024-12-31T23:59:59",
  "created_at": "2024-03-07T10:00:00",
  "company": {
    "id": 1,
    "user_id": 1,
    "name": "Tech Corp",
    "description": "Leading technology company",
    "location": "San Francisco, CA"
  }
}
```

**Errors:**
- `404 Not Found` - Job not found

---

## Application Endpoints

### Apply for Job
**POST** `/applications/`

Apply for a job posting (Student role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "job_id": 1
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "student_id": 1,
  "job_id": 1,
  "status": "pending",
  "applied_at": "2024-03-07T10:00:00",
  "job": null
}
```

**Errors:**
- `400 Bad Request` - Already applied for this job
- `404 Not Found` - Student profile not found

---

### Get My Applications
**GET** `/applications/my-applications`

Get all applications of current student (Student role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "student_id": 1,
    "job_id": 1,
    "status": "pending",
    "applied_at": "2024-03-07T10:00:00",
    "job": {
      "id": 1,
      "company_id": 1,
      "title": "Software Engineer",
      "description": "Full-stack developer position",
      "salary": "$100,000 - $120,000",
      "job_type": "full_time",
      "deadline": "2024-12-31T23:59:59",
      "created_at": "2024-03-07T09:00:00",
      "company": {
        "id": 1,
        "user_id": 1,
        "name": "Tech Corp",
        "description": "Leading technology company",
        "location": "San Francisco, CA"
      }
    }
  }
]
```

---

### Get Job Applications
**GET** `/applications/job/{job_id}`

Get all applications for a specific job (Recruiter or Admin role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "student_id": 1,
    "job_id": 1,
    "status": "pending",
    "applied_at": "2024-03-07T10:00:00",
    "job": null
  }
]
```

---

### Update Application Status
**PUT** `/applications/{application_id}/status`

Update the status of an application (Recruiter or Admin role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (required): One of "pending", "shortlisted", "rejected", "selected"

**Example:**
```
PUT /applications/1/status?status=shortlisted
```

**Response:** `200 OK`
```json
{
  "message": "Status updated successfully"
}
```

**Errors:**
- `404 Not Found` - Application not found

---

## Interview Endpoints

### Schedule Interview
**POST** `/interviews/`

Schedule an interview for an application (Admin role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "application_id": 1,
  "round": "Technical Round 1",
  "date": "2024-03-15T14:00:00",
  "location": "Building A, Room 101"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "application_id": 1,
  "round": "Technical Round 1",
  "date": "2024-03-15T14:00:00",
  "location": "Building A, Room 101"
}
```

**Errors:**
- `404 Not Found` - Application not found

---

### Get My Interviews
**GET** `/interviews/my-interviews`

Get all interviews for current student (Student role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "application_id": 1,
    "round": "Technical Round 1",
    "date": "2024-03-15T14:00:00",
    "location": "Building A, Room 101"
  }
]
```

---

### List All Interviews
**GET** `/interviews/`

Get all scheduled interviews (Admin role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "application_id": 1,
    "round": "Technical Round 1",
    "date": "2024-03-15T14:00:00",
    "location": "Building A, Room 101"
  },
  {
    "id": 2,
    "application_id": 2,
    "round": "HR Round",
    "date": "2024-03-16T10:00:00",
    "location": "Building B, Room 202"
  }
]
```

---

## Result Endpoints

### Publish Result
**POST** `/results/`

Publish a placement result (Admin or Recruiter role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "student_id": 1,
  "job_id": 1,
  "result_status": "selected"  // Options: "selected", "rejected", "waitlisted"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "student_id": 1,
  "job_id": 1,
  "result_status": "selected",
  "created_at": "2024-03-07T10:00:00"
}
```

---

### Get My Results
**GET** `/results/my-results`

Get all results for current student (Student role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "student_id": 1,
    "job_id": 1,
    "result_status": "selected",
    "created_at": "2024-03-07T10:00:00"
  }
]
```

---

### List All Results
**GET** `/results/`

Get all placement results (Admin role required).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "student_id": 1,
    "job_id": 1,
    "result_status": "selected",
    "created_at": "2024-03-07T10:00:00"
  },
  {
    "id": 2,
    "student_id": 2,
    "job_id": 1,
    "result_status": "waitlisted",
    "created_at": "2024-03-07T10:05:00"
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Error message describing what went wrong"
}
```

### 401 Unauthorized
```json
{
  "detail": "Invalid authentication credentials"
}
```

### 403 Forbidden
```json
{
  "detail": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- 100 requests per minute per IP for authentication endpoints
- 1000 requests per minute per user for other endpoints

---

## Pagination

Currently not implemented. For large datasets, consider adding:
- Query parameters: `?skip=0&limit=10`
- Response headers: `X-Total-Count`, `X-Page`, `X-Per-Page`

---

## Testing with cURL

### Register and Login
```bash
# Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","role":"student"}'

# Login
TOKEN=$(curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | jq -r '.access_token')
```

### Use Token
```bash
# Get jobs
curl http://localhost:8000/jobs/ \
  -H "Authorization: Bearer $TOKEN"
```

---

## WebSocket Support

Not currently implemented. Future enhancement for real-time notifications.

---

## API Versioning

Current version: v1 (implicit)
Future versions will use URL prefix: `/api/v2/...`
