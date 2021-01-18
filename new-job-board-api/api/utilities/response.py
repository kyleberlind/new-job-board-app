"""
File to hold response objects
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, validator
from ..models.job_posting.job_posting_model import JobPostingModel
from .alias_generators import snake_to_camel_case

class BaseResponse(BaseModel):
    """Base Response Object"""
    has_error: Optional[bool] = False
    error_message: Optional[str]

    class Config:
        """Response Configuration"""
        alias_generator = snake_to_camel_case
        allow_population_by_alias = True


class LoginResponse(BaseResponse):
    """Response for login request"""
    user_id: Optional[int]
    user_type: Optional[int]


class SignUpResponse(BaseResponse):
    """Response for sign up request"""
    new_user_id: Optional[int]
    user_type: Optional[int]


class EmployerInfoResponse(BaseResponse):
    """Response for employer info"""
    employer_id: Optional[int]
    employer_name: Optional[str]
    employer_size: Optional[str]
    sign_up_date: Optional[datetime]


class BaseSaveResponse(BaseResponse):
    """Base response for request"""
    success: bool


class JobPostingResponse(BaseResponse):
    """Response for job posting"""
    id: int
    employer_id: int
    role: str
    city: str
    state: str
    zip_code: int
    description: str
    date_created: datetime

class JobPostingsResponse(BaseResponse):
    """Response for multiple job postings"""
    job_postings: List[JobPostingResponse]
