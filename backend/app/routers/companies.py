from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.schemas.schemas import CompanyCreate, CompanyResponse
from app.models.models import Company, User, UserRole
from app.auth.jwt import get_current_user, require_role

router = APIRouter(prefix="/companies", tags=["Companies"])

@router.post("/", response_model=CompanyResponse)
def create_company_profile(
    company_data: CompanyCreate,
    current_user: User = Depends(require_role([UserRole.RECRUITER, UserRole.ADMIN])),
    db: Session = Depends(get_db)
):
    if current_user.role == UserRole.RECRUITER:
        existing = db.query(Company).filter(Company.user_id == current_user.id).first()
        if existing:
            raise HTTPException(status_code=400, detail="Company profile already exists")
    
    company = Company(user_id=current_user.id, **company_data.model_dump())
    db.add(company)
    db.commit()
    db.refresh(company)
    return company

@router.get("/", response_model=List[CompanyResponse])
def list_companies(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Company).all()

@router.get("/me", response_model=CompanyResponse)
def get_my_company(
    current_user: User = Depends(require_role([UserRole.RECRUITER])),
    db: Session = Depends(get_db)
):
    company = db.query(Company).filter(Company.user_id == current_user.id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company profile not found")
    return company

@router.get("/{company_id}", response_model=CompanyResponse)
def get_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    return company
