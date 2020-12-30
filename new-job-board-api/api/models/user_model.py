"""Model to represent the User"""

from typing import Optional
from pydantic import BaseModel, validator
from ..utilities.hashed_password_data import HashedPasswordData
from ..utilities.response import snake_to_camel_case


class UserModel(BaseModel):
    """
    Model to represent the user
    """
    email_address: str
    password: str
    user_type: int
    hashed_password_data: Optional[HashedPasswordData]

    class Config:
        """User configuration"""
        arbitrary_types_allowed = True
        alias_generator = snake_to_camel_case
        allow_population_by_alias = True

    @classmethod
    @validator("email_address")
    def validate_email_address_length(cls, value):
        """validates the length of the email address"""
        if len(value) > 64:
            raise ValueError("Email address must be less than 64 characters.")
        return value

    def load_hashed_password_data(self, salt=None):
        """
        Loads the models hashed password data from its plain text password and
        an optional salt
        """
        self.hashed_password_data = HashedPasswordData(self.password, salt)
