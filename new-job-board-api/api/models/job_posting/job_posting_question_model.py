from .base_job_model import BaseJobModel

class JobPostingQuestionModel(BaseJobModel):
    """Model to represent the job posting question"""
    id: int
    title: str
    value: str
    type: str
    description: str
