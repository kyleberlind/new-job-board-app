"""
02/14/2021
Responses for job Postings
"""
from datetime import datetime
from typing import Optional, List
from pydantic import Field
from .base_responses import BaseResponse
from ...models.job_posting.job_posting_field_model import JobPostingFieldModel
from .applicant_responses import ApplicantInfoResponse


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


class JobPostingFieldsResponse(BaseResponse):
    """response for job posting fields"""
    job_posting_fields: Optional[List[JobPostingFieldModel]]


class JobPostingResponse(BaseResponse):
    """Response for job posting"""
    general_info: JobPostingGeneralInfoResponse
    location: JobPostingLocationResponse
    job_posting_fields: Optional[List[JobPostingFieldModel]]


class JobPostingsResponse(BaseResponse):
    """Response for multiple job postings"""
    job_postings: Optional[List[JobPostingResponse]]


class JobCartResponse(BaseResponse):
    """Response for job cart"""
    job_cart: Optional[List[JobPostingResponse]]

class JobPostingApplicationResponse(BaseResponse):
    """Response for a job application"""
    application_id: int
    date_applied: datetime
    applicant_info: ApplicantInfoResponse

class JobPostingApplicationsResponse(BaseResponse):
    """Response for multiple job applications"""
    applications: Optional[List[JobPostingApplicationResponse]]
