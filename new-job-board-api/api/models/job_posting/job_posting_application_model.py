"""
03/02/2021
"""
from datetime import datetime
from .base_job_model import BaseJobModel
from ..applicant.applicant_info_model import ApplicantInfoModel

class JobPostingApplicationModel(BaseJobModel):
    """Response for a job application"""
    application_id: int
    date_applied: datetime
    employer_reference_id: str
    applicant_info: ApplicantInfoModel
