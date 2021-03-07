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

class JobPostingGeneralInfoModelSQLAlchemy(BaseJobModel):
    """Model to represent the job posting general Info in SQLAlchemy"""
    __tablename__ = "tbl_job_posting"
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer)
    role = db.Column(db.String(64))
    description = db.Column(db.String(1024))
    date_created = db.Column(db.DateTime)
    employer_id = db.Column(db.Integer)
    def __repr__(self):
        return '<JobPostingGeneralInfo %r>' % self.id
