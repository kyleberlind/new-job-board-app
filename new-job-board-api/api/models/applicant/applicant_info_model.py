"""
03/02/2021
"""

from typing import Optional
from pydantic import BaseModel

class ApplicantInfoModel(BaseModel):
    """Model to represent the applicant info"""
    applicant_id: Optional[int]
    email_address: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    