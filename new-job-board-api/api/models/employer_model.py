"""02/14/2021"""
from typing import Optional
from .user_model import UserModel
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

    employer_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    employer_name = db.Column(db.String(64))
    employer_size = db.Column(db.String(64))
    sign_up_date = db.Column(db.DateTime)
