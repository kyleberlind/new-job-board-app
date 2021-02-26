"""
02/14/2021
Mappers for job postings
"""
from ...models.job_posting.job_posting_location_model import JobPostingLocationModel
from ...models.job_posting.job_posting_general_info_model import JobPostingGeneralInfoModel


def map_job_posting_info(job_postings: list):
    """Mapper to format job postings"""
    return list(map(format_job_posting_info, job_postings))


def format_job_posting_info(job_posting):
    """Formatting function for the job posting"""
    return {
        "general_info": JobPostingGeneralInfoModel(**job_posting).dict(),
        "location": JobPostingLocationModel(
            **job_posting
        ).dict(),
        "job_posting_fields": job_posting["fields"]
    }


def map_job_posting_applications(applications: list) -> list:
    """Maps over the job posing applications"""
    return list(map(format_job_posting_info, applications))


def format_job_applications(application: dict) -> dict:
    """Formatting function for the job application"""
    return {
        "general_info": JobPostingGeneralInfoModel(**job_posting).dict(),
        "location": JobPostingLocationModel(
            **job_posting
        ).dict(),
        "job_posting_fields": job_posting["fields"]
