"""Model to represent the User"""

from typing import Optional
from pydantic import BaseModel, validator
from ..utilities.hashed_password_data import HashedPasswordData
from ..utilities.alias_generators import snake_to_camel_case
from ..constants.account_constants import EMAIL_LENGTH_VALIDATION_ERROR_MESSAGE, PASSWORD_LENGTH_VALIDATION_ERROR_MESSAGE


class UserModel(BaseModel):
    """Model to represent the user"""
    email_address: str
    password: str
    user_type: Optional[int]
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
            raise ValueError(EMAIL_LENGTH_VALIDATION_ERROR_MESSAGE)
        return value

    @classmethod
    @validator("password")
    def validate_password_length(cls, value):
        """validates the length of the password"""
        if len(value) > 128:
            raise ValueError(PASSWORD_LENGTH_VALIDATION_ERROR_MESSAGE)
        return value

    def load_hashed_password_data(self, salt=None):
        """
        Loads the models hashed password data from its plain text password and
        an optional salt
        """
        if not self.hashed_password_data:
            self.hashed_password_data = HashedPasswordData(self.password, salt)
