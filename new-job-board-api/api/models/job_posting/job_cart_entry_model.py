"""04/13/2021"""
from ...__init__ import db
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


class JobCartEntryModel(db.Model):
    """Model to represent the job cart entry"""
    __tablename__ = "tbl_job_cart"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    job_id = db.Column(db.Integer, ForeignKey('tbl_job_posting.id'))
    user_id = db.Column(db.Integer, ForeignKey('tbl_user.id'))
    job_posting = relationship(
        "JobPostingModelSQLAlchemy",
        uselist=False,
        backref="tbl_job_cart"
    )
