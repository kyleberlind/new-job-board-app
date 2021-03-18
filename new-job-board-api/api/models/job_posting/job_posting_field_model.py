"""02/21/2021"""
from typing import Optional
from .base_job_model import BaseJobModel
from ...__init__ import db


class JobPostingFieldModel(BaseJobModel):
    """Model to represent the job posting field"""
    id: Optional[int]
    required: Optional[bool]
    title: Optional[str]
    value: Optional[str]
    type: Optional[str]
    description: Optional[str]


class JobPostingFieldModelSQLAlchemy(db.Model):
    """Model to represent the job posting field"""
    __tablename__ = "tbl_job_posting_fields"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    value = db.Column(db.String(1024))
    type = db.Column(db.String(64))
    date_created = db.Column(db.DateTime)
    description = db.Column(db.String(1024))
