from .base_job_model import BaseJobModel


class JobLocationModel(BaseJobModel):
    """Model to represent the job location"""
    city: str
    state: str
    zip_code: str
 