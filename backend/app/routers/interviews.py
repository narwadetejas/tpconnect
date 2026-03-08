from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import InterviewCreate, InterviewResponse
from app.models.models import Interview, Application, Student, User, UserRole
from app.auth.jwt import get_current_user, require_role

router = APIRouter(prefix="/interviews", tags=["Interviews"])

@router.post("/", response_model=InterviewResponse)
def schedule_interview(
    interview_data: InterviewCreate,
    current_user: User = Depends(require_role([UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    application = db.query(Application).filter(Application.id == interview_data.application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    interview = Interview(**interview_data.model_dump())
    db.add(interview)
    db.commit()
    db.refresh(interview)
    return interview

@router.get("/my-interviews", response_model=List[InterviewResponse])
def get_my_interviews(
    current_user: User = Depends(require_role([UserRole.STUDENT])),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    
    applications = db.query(Application).filter(Application.student_id == student.id).all()
    app_ids = [app.id for app in applications]
    
    interviews = db.query(Interview).filter(Interview.application_id.in_(app_ids)).all()
    return interviews

@router.get("/", response_model=List[InterviewResponse])
def list_all_interviews(
    current_user: User = Depends(require_role([UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    return db.query(Interview).all()
