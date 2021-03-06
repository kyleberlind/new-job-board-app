"""
03/02/2021
"""
from typing import Optional
from .base_applicant_model import BaseApplicantModel
from ...__init__ import db


class ApplicantInfoModel(BaseApplicantModel):
    """Model to represent the applicant info"""
    applicant_id: Optional[int]
    email_address: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]


class ApplicantInfoModelSQLAlchemy(db.Model):
    """Model to represent the SQL Alchemy applicant info"""
    __tablename__ = "tbl_user"
    __bind_key__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email_address = db.Column(db.String(64))
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
