from typing import List, Optional
from .job_posting_question_model import JobPostingQuestionModel
from .job_location_model import JobLocationModel
from .base_job_model import BaseJobModel

class JobPostingModel(BaseJobModel):
    """Model to represent the job posting"""
    id: Optional[str]
    employer_id: int
    role: str
    location: JobLocationModel
    description:str
    questions: Optional[List[JobPostingQuestionModel]]
        