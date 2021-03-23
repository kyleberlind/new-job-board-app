"""02/14/2021"""
from typing import List, Optional
from sqlalchemy.orm import relationship
from .job_posting_general_info_model import JobPostingGeneralInfoModel
from .job_posting_location_model import JobPostingLocationModel
from .job_posting_field_model import JobPostingFieldModel
from .base_job_model import BaseJobModel
from ...__init__ import db


class JobPostingModel(BaseJobModel):
    """Model to represent the job posting"""
    general_info: JobPostingGeneralInfoModel
    location: JobPostingLocationModel
    job_posting_fields: Optional[List[JobPostingFieldModel]]

class JobPostingModelSQLAlchemy(db.Model):
    """Model to represent the job posting in SQL Alchemy"""
    __tablename__ = "tbl_job_posting"
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer)
    role = db.Column(db.String(64))
    team = db.Column(db.String(64))
    description = db.Column(db.String(1024))
    date_created = db.Column(db.DateTime)
    location = relationship(
        "JobPostingLocationModelSQLAlchemy",
        uselist=False,
        backref="tbl_job_posting"
    )
    fields = relationship(
        "JobPostingFieldMappingModel",
        uselist=True,
        backref="tbl_job_posting"
    )

    def __repr__(self):
        return '<JobPosting %r>' % self.id
