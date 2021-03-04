"""
02/14/2021
Responses for job Postings
"""
from typing import Optional, List
from datetime import datetime
from .base_responses import BaseResponse
from ...models.job_posting.job_posting_field_model import JobPostingFieldModel
from ...models.job_posting.job_posting_model import JobPostingModel
from ...models.job_posting.job_posting_application_model import JobPostingApplicationModel
from .applicant_responses import ApplicantInfoResponse


class JobPostingFieldsResponse(BaseResponse):
    """response for job posting fields"""
    job_posting_fields: Optional[List[JobPostingFieldModel]]


class JobPostingsResponse(BaseResponse):
    """Response for multiple job postings"""
    job_postings: Optional[List[JobPostingModel]]


class JobCartResponse(BaseResponse):
    """Response for job cart"""
    job_cart: Optional[List[JobPostingModel]]


class JobPostingApplicationResponse(BaseResponse):
    """Response for a job application"""
    application_id: int
    date_applied: datetime
    applicant_info: Optional[ApplicantInfoResponse]
    employer_name: Optional[str]
    description: Optional[str]
    role: Optional[str]
    city: Optional[str]
    state: Optional[str]


class JobPostingApplicationsResponse(BaseResponse):
    """Response for multiple job applications"""
    applications: Optional[List[JobPostingApplicationModel]]
