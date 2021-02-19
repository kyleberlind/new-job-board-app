"""02/14/2021"""
import json
from flask import Blueprint, jsonify, session, request
from ..utilities.responses.applicant_responses import ApplicantInfoResponse
from ..utilities.responses.job_posting_responses import JobPostingsResponse, JobCartResponse
from ..models.job_posting.job_posting_processor_model import JobPostingProcessorModel
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
        return ApplicantInfoResponse(**account_info).json(by_alias=True)
    except Exception as error:
        return ApplicantInfoResponse(
            hasError=True,
            errorMessage=str(error)
        ).json(by_alias=True)


@applicant_view.route("/search_job_postings", methods=['POST'])
def load_job_postings_by_employer_id():
    """Searches for job postings based on search input data"""
    job_posting_processor = JobPostingProcessorModel()
    try:
        search_input = json.loads(request.data)
        job_postings = {
            "job_postings": job_posting_processor.search_job_postings(
                search_input["jobSearchQuery"],
                search_input["jobSearchLocationQuery"]
            )
        }
        return JobPostingsResponse(**job_postings).json(by_alias=True)
    except Exception as error:
        return JobPostingsResponse(
            hasError=True,
            errorMessage=str(error)
        ).json(by_alias=True)


@applicant_view.route("/add_posting_to_job_cart", methods=['POST'])
def add_posting_to_job_cart():
    """Adds a job posting to the job cart"""
    job_posting_processor = JobPostingProcessorModel()
    job_id = json.loads(request.data)["jobId"]

    def job_cart_contains_id(id):
        if 'job_cart' in session:
            for job in session['job_cart']:
                if job['general_info']['id'] == id:
                    return True
        return False
    if 'job_cart' in session:
        if (job_cart_contains_id(job_id)):
            return JobCartResponse(
                hasError=True,
                errorMessage="job_id already in job cart"
            ).json(by_alias=True)
        else:
            session['job_cart'] += job_posting_processor.load_job_posting_by_id(job_id)
    else:
        session['job_cart'] = job_posting_processor.load_job_posting_by_id(job_id)
    job_cart_response = {
        "job_cart": session['job_cart']
    }
    return JobCartResponse(**job_cart_response).json(by_alias=True)


@applicant_view.route("/load_job_cart", methods=['GET'])
def load_job_cart():
    """Loads the job cart"""
    if 'job_cart' not in session:
        session['job_cart'] = []
    job_cart_response = {
        "job_cart": session['job_cart']
    }
    return JobCartResponse(**job_cart_response).json(by_alias=True)


@applicant_view.route("/checkout_job_cart", methods=['GET'])
def checkout_job_cart():
    """Checkout the job cart"""
    job_dao = JobDao()
    if 'job_cart' not in session:
        return JobCartResponse(
            hasError=True,
            errorMessage="No jobs in job cart"
        ).json(by_alias=True)
    else:
        if len(session['job_cart']) == 0:
            return JobCartResponse(
                hasError=True,
                errorMessage="No jobs in job cart"
            ).json(by_alias=True)
        try:
            print("here")
            job_dao.submit_job_applications(
                session['job_cart'], session['token'])
            session['job_cart'] = []
            job_cart_response = {
                "job_cart": session['job_cart']
            }
            return JobCartResponse(**job_cart_response).json(by_alias=True)
        except Exception as error:
            return JobCartResponse(
                hasError=True,
                errorMessage=str(error)
            ).json(by_alias=True)
