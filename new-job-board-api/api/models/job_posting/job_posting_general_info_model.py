"""02/14/2021"""
from typing import Optional
from datetime import datetime
from .base_job_model import BaseJobModel
from ...__init__ import db

class JobPostingGeneralInfoModel(BaseJobModel):
    """Model to represent the general info for the job posting"""
    id: Optional[str]
    employer_id: int
    role: str
    team: Optional[str]
    description:str
    date_created: Optional[datetime]
    applied: Optional[bool]
    