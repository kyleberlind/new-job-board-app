from flask import Blueprint, jsonify, session

employer_view = Blueprint('employer_view', __name__)

@employer_view.route('/load_employer_info', methods=['GET'])
def load_employer_info():
    if 'token' not in session:
        return jsonify({'employerData': False})
    return jsonify({'employerData': session['token']})
