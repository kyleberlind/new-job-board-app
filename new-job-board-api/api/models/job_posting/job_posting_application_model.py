"""
03/02/2021
"""
from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from .base_job_model import BaseJobModel
from ..applicant.applicant_info_model import ApplicantInfoModel
from ...__init__ import db


class JobPostingApplicationModel(BaseJobModel):
    """Model to represent a job application"""
    application_id: int
    date_applied: datetime
    employer_reference_id: str
    applicant_info: ApplicantInfoModel


class JobPostingApplicationModelSQLAlchemy(db.Model):
    """Model for SQLAlchemy JobApplication"""
    __tablename__ = "tbl_job_posting_applications"
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, ForeignKey('tbl_job_posting.id'), ForeignKey(
        'tbl_job_posting_field_mapping.job_id'))
    applicant_id = db.Column(db.Integer, ForeignKey('tbl_user.id'))
    employer_id = db.Column(db.Integer)
    date_applied = db.Column(db.DateTime)
    employer_reference_id = db.Column(db.String(36))
    applicant_info = relationship(
        "ApplicantInfoModelSQLAlchemy",
        backref="tbl_job_posting_applications"
    )
    job_posting = relationship(
        "JobPostingModelSQLAlchemy")

    def __repr__(self):
        return '<JobPostingApplication %r>' % self.id
