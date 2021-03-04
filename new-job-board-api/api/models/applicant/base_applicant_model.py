"""02/14/2021"""
from pydantic import BaseModel
from ...utilities.alias_generators import snake_to_camel_case

class BaseApplicantModel(BaseModel):
    """Base model for job objects"""
    class Config:
        """Response Configuration"""
        arbitrary_types_allowed = True
        alias_generator = snake_to_camel_case
        allow_population_by_alias = True
        allow_population_by_field_name = True
