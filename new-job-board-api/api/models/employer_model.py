from .user_model import UserModel
from typing import Optional


class EmployerModel(UserModel):
    """Model to represent the user"""
    employer_id: Optional[int]
    employer_name: Optional[str]
    employer_size: Optional[str]
