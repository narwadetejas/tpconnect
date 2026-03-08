from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import ApplicationCreate, ApplicationResponse
from app.models.models import Application, Student, Job, Company, User, UserRole, ApplicationStatus
from app.auth.jwt import get_current_user, require_role

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.post("/", response_model=ApplicationResponse)
def apply_for_job(
    app_data: ApplicationCreate,
    current_user: User = Depends(require_role([UserRole.STUDENT])),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    
    existing = db.query(Application).filter(
        Application.student_id == student.id,
        Application.job_id == app_data.job_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already applied for this job")
    
    application = Application(student_id=student.id, job_id=app_data.job_id)
    db.add(application)
    db.commit()
    db.refresh(application)
    return application

@router.get("/my-applications", response_model=List[ApplicationResponse])
def get_my_applications(
    current_user: User = Depends(require_role([UserRole.STUDENT])),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    
    applications = db.query(Application).filter(Application.student_id == student.id).all()
    for app in applications:
        app.job = db.query(Job).filter(Job.id == app.job_id).first()
        if app.job:
            app.job.company = db.query(Company).filter(Company.id == app.job.company_id).first()
    return applications

@router.get("/job/{job_id}", response_model=List[ApplicationResponse])
def get_job_applications(
    job_id: int,
    current_user: User = Depends(require_role([UserRole.RECRUITER, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    return db.query(Application).filter(Application.job_id == job_id).all()

@router.put("/{application_id}/status")
def update_application_status(
    application_id: int,
    status: ApplicationStatus,
    current_user: User = Depends(require_role([UserRole.RECRUITER, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    application.status = status
    db.commit()
    return {"message": "Status updated successfully"}
