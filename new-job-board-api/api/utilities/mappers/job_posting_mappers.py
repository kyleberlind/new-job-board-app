"""
02/14/2021
Mappers for job postings
"""
from ...models.job_posting.job_posting_location_model import JobPostingLocationModel
from ...models.job_posting.job_posting_general_info_model import JobPostingGeneralInfoModel
from ...models.applicant.applicant_info_model import ApplicantInfoModel


def map_job_posting_info(job_postings: list):
    """Mapper to format job postings"""
    return list(map(format_job_posting_info, job_postings))

def format_job_posting_info(job_posting):
    """Formatting function for the job posting"""
    return {
        "general_info": JobPostingGeneralInfoModel(**job_posting),
        "location": JobPostingLocationModel(
            **job_posting
        ),
        "job_posting_fields": job_posting["job_posting_fields"] if "job_posting_fields" in job_posting else []
    }

def map_job_applications(applications: list) -> list:
    """Maps over the job posing applications"""
    return list(map(format_job_applications, applications))


def format_job_applications(application: dict) -> dict:
    """Formatting function for the job application"""
    return {
        "application_id": application["application_id"],
        "date_applied": application["date_applied"],
        "employer_reference_id": application["employer_reference_id"],
        "applicant_info": ApplicantInfoModel(**application)
    }
