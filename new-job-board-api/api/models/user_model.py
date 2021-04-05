"""Model to represent the User"""

from typing import Optional
from pydantic import BaseModel, validator
from ..utilities.hashed_password_data import HashedPasswordData
from ..utilities.alias_generators import snake_to_camel_case
from ..constants.account_constants import (
    EMAIL_LENGTH_VALIDATION_ERROR_MESSAGE, PASSWORD_LENGTH_VALIDATION_ERROR_MESSAGE)
from ..__init__ import db
from sqlalchemy.orm import relationship


class UserModel(BaseModel):
    """Model to represent the user"""
    email_address: str
    password: str
    first_name: Optional[str]
    last_name: Optional[str]
    user_type: Optional[int]
    hashed_password_data: Optional[HashedPasswordData]

    class Config:
        """User configuration"""
        arbitrary_types_allowed = True
        alias_generator = snake_to_camel_case
        allow_population_by_alias = True
        allow_reuse = True

    def load_hashed_password_data(self, salt=None):
        """
        Loads the models hashed password data from its plain text password and
        an optional salt
        """
        if not self.hashed_password_data:
            self.hashed_password_data = HashedPasswordData(self.password, salt)


class UserModelSQLAlchemy(db.Model):
    """Model to represent the user"""
    __tablename__ = "tbl_user"
    __bind_key__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email_address = db.Column(db.String(64))
    password = db.Column(db.String(128))
    first_name = db.Column(db.String(64))
    last_name = db.Column(db.String(64))
    user_type = db.Column(db.Integer)
    sign_up_date = db.Column(db.DateTime)
    salt = db.Column(db.String(128))
    applications = relationship(
        "JobPostingApplicationModelSQLAlchemy",
        uselist=True,
        backref="tbl_user"
    )
