from typing import Optional
from pydantic import BaseModel, validator
from ...utilities.alias_generators import snake_to_camel_case

class BaseJobModel(BaseModel):
    """Base model for job objects"""
    class Config:
        """Response Configuration"""
        alias_generator = snake_to_camel_case
        allow_population_by_alias = True
        arbitrary_types_allowed = True
