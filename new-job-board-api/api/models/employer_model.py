"""02/14/2021"""
from typing import Optional
from .user_model import UserModel


class EmployerModel(UserModel):
    """Model to represent the user"""
    employer_id: Optional[int]
    employer_name: Optional[str]
    employer_size: Optional[str]
