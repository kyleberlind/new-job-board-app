"""
02/14/2021
Base responses
"""
from typing import Optional
from pydantic import BaseModel
from ..alias_generators import snake_to_camel_case


class BaseResponse(BaseModel):
    """Base Response Object"""
    has_error: Optional[bool] = False
    error_message: Optional[str]

    class Config:
        """Response Configuration"""
        allow_population_by_field_name=True
        alias_generator = snake_to_camel_case
        allow_population_by_alias = True
        arbitrary_types_allowed = True


class BaseSaveResponse(BaseResponse):
    """Base response for request"""
    success: bool
