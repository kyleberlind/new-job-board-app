"""
File to hold response objects
"""
from typing import Optional
from pydantic import BaseModel


def snake_to_camel_case(string: str) -> str:
    """Converts snake case to camel case"""
    split_words, camel_case_words = string.split('_'), ''
    for index, word in enumerate(split_words):
        if index == 0:
            camel_case_words += word
        else:
            camel_case_words += word.capitalize()
    return camel_case_words


class BaseResponse(BaseModel):
    """Base Response Object"""

    class Config:
        """Response Configuration"""
        alias_generator = snake_to_camel_case
        allow_population_by_alias = True


class LoginResponse(BaseResponse):
    """Response for login request"""
    user_id: Optional[int]
    user_type: Optional[int]
    has_error: Optional[bool]
    error_message: Optional[str]


class SignUpResponse(BaseResponse):
    """Response for sign up request"""
    new_user_id: Optional[int]
    user_type: Optional[int]
    has_error: Optional[bool] = False
    error_message: Optional[str]
