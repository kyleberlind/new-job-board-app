"""02/14/2021"""
from sqlalchemy import ForeignKey
from .base_job_model import BaseJobModel
from ...__init__ import db
import json

class JobPostingLocationModel(BaseJobModel):
    """Model to represent the job location"""
    city: str
    state: str
    zip_code: str

    def toJSONObject(self):
        return json.loads(json.dumps(self, default=lambda o: o.__dict__))


class JobPostingLocationModelSQLAlchemy(db.Model):
    """Model to represent the job location"""
    __tablename__ = "tbl_job_posting_location"
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, ForeignKey('tbl_job_posting.id'))
    city = db.Column(db.String(64))
    state = db.Column(db.String(64))
    zip_code = db.Column(db.String(64))
