"""
02/14/2021
Responses for the applicant
"""  
from typing import Optional
from .base_responses import BaseResponse

class ApplicantInfoResponse(BaseResponse):
    """Response for applicant info"""
    applicant_id: Optional[int]
    email_address: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    