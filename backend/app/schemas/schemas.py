from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.models import UserRole, ApplicationStatus, JobType, ResultStatus

# Auth Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: UserRole

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: UserRole

# Student Schemas
class StudentCreate(BaseModel):
    name: str
    branch: Optional[str] = None
    cgpa: Optional[float] = None
    skills: Optional[str] = None
    resume_url: Optional[str] = None

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    branch: Optional[str] = None
    cgpa: Optional[float] = None
    skills: Optional[str] = None
    resume_url: Optional[str] = None

class StudentResponse(BaseModel):
    id: int
    user_id: int
    name: str
    branch: Optional[str]
    cgpa: Optional[float]
    skills: Optional[str]
    resume_url: Optional[str]
    
    class Config:
        from_attributes = True

# Company Schemas
class CompanyCreate(BaseModel):
    name: str
    description: Optional[str] = None
    location: Optional[str] = None

class CompanyResponse(BaseModel):
    id: int
    user_id: int
    name: str
    description: Optional[str]
    location: Optional[str]
    
    class Config:
        from_attributes = True

# Job Schemas
class JobCreate(BaseModel):
    title: str
    description: Optional[str] = None
    salary: Optional[str] = None
    job_type: JobType
    deadline: Optional[datetime] = None

class JobResponse(BaseModel):
    id: int
    company_id: int
    title: str
    description: Optional[str]
    salary: Optional[str]
    job_type: JobType
    deadline: Optional[datetime]
    created_at: datetime
    company: Optional[CompanyResponse] = None
    
    class Config:
        from_attributes = True

# Application Schemas
class ApplicationCreate(BaseModel):
    job_id: int

class ApplicationResponse(BaseModel):
    id: int
    student_id: int
    job_id: int
    status: ApplicationStatus
    applied_at: datetime
    job: Optional[JobResponse] = None
    
    class Config:
        from_attributes = True

# Interview Schemas
class InterviewCreate(BaseModel):
    application_id: int
    round: str
    date: datetime
    location: Optional[str] = None

class InterviewResponse(BaseModel):
    id: int
    application_id: int
    round: str
    date: datetime
    location: Optional[str]
    
    class Config:
        from_attributes = True

# Result Schemas
class ResultCreate(BaseModel):
    student_id: int
    job_id: int
    result_status: ResultStatus

class ResultResponse(BaseModel):
    id: int
    student_id: int
    job_id: int
    result_status: ResultStatus
    created_at: datetime
    
    class Config:
        from_attributes = True
