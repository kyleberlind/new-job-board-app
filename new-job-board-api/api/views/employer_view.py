"""02/14/2021"""
import json
from flask import Blueprint, session, request
from ..daos.account_dao import AccountDao
from ..utilities.responses.employer_responses import EmployerInfoResponse
from ..utilities.responses.base_responses import BaseSaveResponse
from ..utilities.responses.job_posting_responses import JobPostingsResponse, JobPostingFieldsResponse
from ..models.job_posting.job_posting_model import JobPostingModel
from ..models.job_posting.job_posting_processor_model import JobPostingProcessorModel


employer_view = Blueprint("employer_view", __name__)


@employer_view.route("/load_employer_info", methods=["GET"])
def load_employer_info():
    """Loads the employer Information"""
    account_dao = AccountDao()
    try:
        if "token" in session:
            employer_info = account_dao.load_employer_info(session["token"])
            return EmployerInfoResponse(
                **employer_info
            ).json(by_alias=True)
        raise Exception("No User Logged in")
    except Exception as error:
        return EmployerInfoResponse(
            has_error=True,
            error_message=str(error)
        ).json(by_alias=True)


@employer_view.route("/get_job_posting_fields", methods=["GET"])
def get_job_posting_fields():
    """Gets the fields for a job posting"""
    job_posting_processor = JobPostingProcessorModel()
    try:
        job_posting_processor.get_job_posting_fields()
        return JobPostingFieldsResponse(
            job_posting_fields=job_posting_processor.get_job_posting_fields()
        ).json(by_alias=True)
    except Exception as error:
        return JobPostingFieldsResponse(
            has_error=True,
            error_message=str(error)
        )


@employer_view.route("/save_new_job_posting", methods=['POST'])
def save_new_job_posting():
    """Saves a job posting for an employer"""
    job_posting_data = json.loads(request.data)
    job_posting_processor = JobPostingProcessorModel()
    try:
        job_posting = JobPostingModel(
            **job_posting_data
        )
        result = job_posting_processor.save_new_job_posting(job_posting)
        return BaseSaveResponse(success=result).json(by_alias=True)
    except Exception as error:
        return BaseSaveResponse(
            success=False,
            has_error=True,
            error_message=str(error)
        ).json(by_alias=True)


@employer_view.route("/update_job_posting", methods=['POST'])
def update_job_posting():
    """Updates an existing job posting"""
    job_posting_data = json.loads(request.data)
    job_posting_processor = JobPostingProcessorModel()
    try:
        job_posting = JobPostingModel(
            **job_posting_data
        )
        result = job_posting_processor.update_job_posting(job_posting)
        return BaseSaveResponse(success=result).json(by_alias=True)
    except Exception as error:
        return BaseSaveResponse(
            success=False,
            has_error=True,
            error_message=str(error)
        ).json(by_alias=True)


@employer_view.route("/load_job_postings_by_employer_id", methods=['POST'])
def load_job_postings_by_employer_id():
    """Loads the job posting for an employer by their ID"""
    job_posting_processor = JobPostingProcessorModel()
    try:
        employer_id = json.loads(request.data)
        job_postings = {
            "job_postings": job_posting_processor.load_job_postings_by_employer_id(employer_id)
        }
        return JobPostingsResponse(**job_postings).json(by_alias=True)
    except Exception as error:
        return JobPostingsResponse(
            hasError=True,
            errorMessage=str(error)
        ).json(by_alias=True)


@employer_view.route("/delete_job_posting", methods=['POST'])
def delete_job_posting():
    """Deletes an existing job posting"""
    job_posting_processor = JobPostingProcessorModel()
    try:
        job_id = json.loads(request.data)
        result = job_posting_processor.delete_job_posting(job_id)
        return BaseSaveResponse(success=result).json(by_alias=True)
    except Exception as error:
        return BaseSaveResponse(
            success=False,
            hasError=True,
            errorMessage=str(error)
        ).json(by_alias=True)


@employer_view.route("/load_job_applications_by_job_id", methods=['POST'])
def load_job_applications_by_job_id():
    """Loads the applications for a job posting"""
    job_posting_processor = JobPostingProcessorModel()
    try:
        job_id = json.loads(request.data)
        "applications": {applications = job_posting_processor.load_job_applications_by_job_id(
            job_id)}
        return JobPostingApplicationResponse(**applications)
    except Exception as error:
        return JobPostingsResponse(
            hasError=True,
            errorMessage=str(error)
        ).json(by_alias=True)
