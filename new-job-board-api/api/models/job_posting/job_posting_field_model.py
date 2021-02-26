"""02/21/2021"""
from typing import Optional
from .base_job_model import BaseJobModel

class JobPostingFieldModel(BaseJobModel):
    """Model to represent the job posting field"""
    id: Optional[int]
    required: Optional[bool]
    title: Optional[str]
    value: Optional[str]
    type: Optional[str]
    description: Optional[str]

