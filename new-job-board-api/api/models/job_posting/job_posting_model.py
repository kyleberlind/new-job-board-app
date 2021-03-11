"""02/14/2021"""
from typing import List, Optional
from .job_posting_general_info_model import  JobPostingGeneralInfoModel, JobPostingGeneralInfoModelSQLAlchemy 
from .job_posting_location_model import JobPostingLocationModel
from .job_posting_field_model import JobPostingFieldModel
from .base_job_model import BaseJobModel
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from ...__init__ import db


class JobPostingModel(BaseJobModel):
    """Model to represent the job posting"""
    general_info: JobPostingGeneralInfoModel
    location: JobPostingLocationModel
    job_posting_fields: Optional[List[JobPostingFieldModel]]


class JobPostingModelSQLAlchemy(db.Model):
    """Model to represent the job posting in SQL Alchemy"""
    extend_existing=True
    id = db.Column(db.Integer, primary_key=True)
    def __repr__(self):
        return '<JobPosting %r>' % self.id
