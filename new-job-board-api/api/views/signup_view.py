from flask import Blueprint, jsonify, request
import json

main = Blueprint('main', __name__)


@main.route('/sign_up_user', methods=['POST'])
def sign_up_user():
    user_data = {
        'email': 'kyberlind@gmail.com',
        'password': 'kyleiscool'
    }

    return 'OK', 201
