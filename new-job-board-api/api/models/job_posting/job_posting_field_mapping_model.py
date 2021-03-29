"""03/08/2021"""
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from ...__init__ import db

class JobPostingFieldMappingModel(db.Model):
    """Model to represent the field mapping"""
    __tablename__ = "tbl_job_posting_field_mapping"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    required = db.Column(db.Integer)
    job_id = db.Column(db.Integer, ForeignKey('tbl_job_posting.id'))
    field_id = db.Column(db.Integer, ForeignKey('tbl_job_posting_fields.id'))
    required = db.Column(db.Integer)
    field = relationship(
        "JobPostingFieldModelSQLAlchemy",
        backref="tbl_job_posting_field_mapping"
    )
 