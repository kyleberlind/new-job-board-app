"""02/14/2021"""
from .base_job_model import BaseJobModel


class JobPostingLocationModel(BaseJobModel):
    """Model to represent the job location"""
    city: str
    state: str
    zip_code: str
 