"""02/14/2021"""
import json
from flask import Blueprint, jsonify, session, request
from ..utilities.responses.applicant_responses import ApplicantInfoResponse
from ..utilities.responses.job_posting_responses import JobPostingsResponse
from ..daos.account_dao import AccountDao
from ..daos.job_dao import JobDao

applicant_view = Blueprint('applicant_view', __name__)


@applicant_view.route('/load_applicant_info', methods=['GET'])
def load_applicant_info():
    """Loads the applicant info"""
    if 'token' not in session:
        return jsonify({'applicantData': False})
    return jsonify({'applicantData': session['token']})


@applicant_view.route('/load_applicant_info_from_id', methods=['POST'])
def load_applicant_info_from_id():
    """Fetches applicant info from applicant id"""
    account_dao = AccountDao()
    try:
        account_id = json.loads(request.data)
        account_info = account_dao.get_user_info_from_id(account_id)
        print(account_info)
        return ApplicantInfoResponse(**account_info).json(by_alias=True)
    except Exception as error:
        return ApplicantInfoResponse(
            hasError=True,
            errorMessage=str(error)
        ).json(by_alias=True)


@applicant_view.route("/search_job_postings", methods=['POST'])
def load_job_postings_by_employer_id():
    """Searches for job postings based on search input data"""
    job_dao = JobDao()
    try:
        search_input = json.loads(request.data)
        job_postings = {
            "job_postings": job_dao.search_job_postings(search_input["jobSearchQuery"], search_input["jobSearchLocationQuery"])
        }
        return JobPostingsResponse(**job_postings).json(by_alias=True)
    except Exception as error:
        return JobPostingsResponse(
            hasError=True,
            errorMessage=str(error)
        ).json(by_alias=True)
