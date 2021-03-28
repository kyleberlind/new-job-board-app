"""02/14/2021"""
from typing import Optional
from sqlalchemy import ForeignKey
from datetime import datetime
from .base_job_model import BaseJobModel
from ...__init__ import db
import json


class JobPostingGeneralInfoModel(BaseJobModel):
    """Model to represent the general info for the job posting"""
    id: Optional[str]
    employer_id: int
    role: str
    team: Optional[str]
    description: str
    date_created: Optional[datetime]
    applied: Optional[bool]

    def toJSONObject(self):
        def json_default(value):
            if isinstance(value, datetime):
                return str(value)
            else:
                return value.__dict__
        return json.loads(json.dumps(self, default=lambda o: json_default(o)))
