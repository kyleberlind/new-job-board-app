"""
02/14/2021
Responses for the employer
"""
from typing import Optional
from datetime import datetime
from .base_responses import BaseResponse


class EmployerInfoResponse(BaseResponse):
    """Response for employer info"""
    employer_id: Optional[int]
    employer_name: Optional[str]
    employer_email_address: Optional[str]
    employer_size: Optional[str]
    sign_up_date: Optional[datetime]
