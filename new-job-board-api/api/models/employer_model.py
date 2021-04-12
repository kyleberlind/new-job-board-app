"""02/14/2021"""
from typing import Optional
from sqlalchemy.orm import relationship
from .user_model import UserModel
from sqlalchemy import ForeignKey
from ..__init__ import db


class EmployerModel(UserModel):
    """Model to represent the employer"""
    employer_id: Optional[int]
    employer_name: Optional[str]
    employer_size: Optional[str]


class EmployerModelSQLAlchemy(db.Model):
    """Model to represent the employer"""
    __tablename__ = "tbl_employer"
    __bind_key__ = 'user'
    __table_args__ = {'schema': 'user'}

    employer_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  ForeignKey('tbl_user.id'))
    employer_name = db.Column(db.String(64))
    employer_size = db.Column(db.String(64))
    sign_up_date = db.Column(db.DateTime)
    job_postings = relationship(
        "JobPostingModelSQLAlchemy",
        uselist=True,
        backref="tbl_employer"
    )
    user_info = relationship(
        "UserModelSQLAlchemy",
        uselist=False,
        backref="tbl_employer"
    )
