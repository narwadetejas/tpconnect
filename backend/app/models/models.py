from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database.connection import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    STUDENT = "student"
    RECRUITER = "recruiter"

class ApplicationStatus(str, enum.Enum):
    PENDING = "pending"
    SHORTLISTED = "shortlisted"
    REJECTED = "rejected"
    SELECTED = "selected"

class JobType(str, enum.Enum):
    INTERNSHIP = "internship"
    FULL_TIME = "full_time"

class ResultStatus(str, enum.Enum):
    SELECTED = "selected"
    REJECTED = "rejected"
    WAITLISTED = "waitlisted"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Student(Base):
    __tablename__ = "students"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    name = Column(String, nullable=False)
    branch = Column(String)
    cgpa = Column(Float)
    skills = Column(String)
    resume_url = Column(String)
    
    user = relationship("User", backref="student")
    applications = relationship("Application", back_populates="student")
    results = relationship("Result", back_populates="student")

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    name = Column(String, nullable=False)
    description = Column(String)
    location = Column(String)
    
    user = relationship("User", backref="company")
    jobs = relationship("Job", back_populates="company")

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"))
    title = Column(String, nullable=False)
    description = Column(String)
    salary = Column(String)
    job_type = Column(SQLEnum(JobType), nullable=False)
    deadline = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    company = relationship("Company", back_populates="jobs")
    applications = relationship("Application", back_populates="job")
    results = relationship("Result", back_populates="job")

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    status = Column(SQLEnum(ApplicationStatus), default=ApplicationStatus.PENDING)
    applied_at = Column(DateTime, default=datetime.utcnow)
    
    student = relationship("Student", back_populates="applications")
    job = relationship("Job", back_populates="applications")
    interviews = relationship("Interview", back_populates="application")

class Interview(Base):
    __tablename__ = "interviews"
    
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"))
    round = Column(String)
    date = Column(DateTime)
    location = Column(String)
    
    application = relationship("Application", back_populates="interviews")

class Result(Base):
    __tablename__ = "results"
    
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    result_status = Column(SQLEnum(ResultStatus))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    student = relationship("Student", back_populates="results")
    job = relationship("Job", back_populates="results")
