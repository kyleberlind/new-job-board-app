"""02/14/2021"""
from typing import List, Optional
from .job_posting_general_info_model import  JobPostingGeneralInfoModel
from .job_posting_location_model import JobPostingLocationModel
from .job_posting_field_model import JobPostingFieldModel
from .base_job_model import BaseJobModel

class JobPostingModel(BaseJobModel):
    """Model to represent the job posting"""
    general_info: JobPostingGeneralInfoModel
    location: JobPostingLocationModel
    job_posting_fields: Optional[List[JobPostingFieldModel]]
