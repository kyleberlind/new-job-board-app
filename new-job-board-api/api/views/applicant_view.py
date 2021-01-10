from flask import Blueprint, jsonify, session

applicant_view = Blueprint('applicant_view', __name__)

@applicant_view.route('/load_applicant_info', methods=['GET'])
def load_employer_info():
    if 'token' not in session:
        return jsonify({'applicantData': False})
    return jsonify({'applicantData': session['token']})
