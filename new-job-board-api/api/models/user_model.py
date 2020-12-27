from typing import Optional
from pydantic import BaseModel
from ..utilities.hashed_password_data import HashedPasswordData

class UserModel(BaseModel):
    """
    Model to represent the user
    """
    email_address: str
    password: str
    user_type: int
    hashed_password_data: Optional[HashedPasswordData]

    class Config:
        arbitrary_types_allowed=True

    def load_hashed_password_data(self, salt=None):
        """loads the models hashed password data from its plain text password and an optional salt"""
        self.hashed_password_data = HashedPasswordData(self.password, salt)