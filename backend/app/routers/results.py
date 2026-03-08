from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import ResultCreate, ResultResponse
from app.models.models import Result, Student, User, UserRole
from app.auth.jwt import get_current_user, require_role

router = APIRouter(prefix="/results", tags=["Results"])

@router.post("/", response_model=ResultResponse)
def publish_result(
    result_data: ResultCreate,
    current_user: User = Depends(require_role([UserRole.ADMIN, UserRole.RECRUITER])),
    db: Session = Depends(get_db)
):
    result = Result(**result_data.model_dump())
    db.add(result)
    db.commit()
    db.refresh(result)
    return result

@router.get("/my-results", response_model=List[ResultResponse])
def get_my_results(
    current_user: User = Depends(require_role([UserRole.STUDENT])),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    
    return db.query(Result).filter(Result.student_id == student.id).all()

@router.get("/", response_model=List[ResultResponse])
def list_all_results(
    current_user: User = Depends(require_role([UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    return db.query(Result).all()
