"""
02/14/2021
Responses for accounts
"""
from typing import Optional
from .base_responses import BaseResponse


class LoginResponse(BaseResponse):
    """Response for login request"""
    user_id: Optional[int]
    user_type: Optional[int]


class SignUpResponse(BaseResponse):
    """Response for sign up request"""
    new_user_id: Optional[int]
    user_type: Optional[int]
