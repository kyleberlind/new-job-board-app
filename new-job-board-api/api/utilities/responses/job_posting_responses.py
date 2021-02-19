"""
02/14/2021
Responses for job Postings
"""
from typing import Optional, List
from datetime import datetime
from .base_responses import BaseResponse


class JobPostingGeneralInfoResponse(BaseResponse):
    """Response for job posting general info"""
    id: int
    employer_id: int
    role: str
    team: Optional[str]
    description: str
    date_created: datetime


class JobPostingLocationResponse(BaseResponse):
    """Response for job posting location"""
    city: str
    state: str
    zip_code: str


class JobPostingQuestionResponse(BaseResponse):
    """Response for job posting questions"""
    id: int
    title: str
    value: str
    type: str
    description: str
    date_created: datetime


class JobPostingResponse(BaseResponse):
    """Response for job posting"""
    general_info: JobPostingGeneralInfoResponse
    location: JobPostingLocationResponse


class JobPostingsResponse(BaseResponse):
    """Response for multiple job postings"""
    job_postings: List[JobPostingResponse]


class JobCartResponse(BaseResponse):
    """Response for job cart"""
    job_cart: Optional[List[JobPostingResponse]]
