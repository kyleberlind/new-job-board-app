import json
from flask import Blueprint, jsonify, request, session
from ..models.account_model import AccountModel
from ..models.user_model import UserModel
from ..utilities.response import LoginResponse, SignUpResponse

account_view = Blueprint("account_view", __name__)


@account_view.route("/sign_up", methods=["POST"])
def sign_up():
    """End point for signing up a new user"""
    user_data = json.loads(request.data)
    account_model = AccountModel()
    try:
        user = UserModel(**user_data)
        new_user_info = account_model.sign_up_user(user)
        # replace with JWT token
        session["token"] = new_user_info["user_id"]
        session["user_type"] = new_user_info["user_type"]
        return SignUpResponse(**new_user_info).json(by_alias=True)
    except Exception as error:
        return SignUpResponse(
            has_error=True,
            error_message=str(error)
        ).json(by_alias=True)


@account_view.route("/login", methods=["POST", "GET"])
def login():
    """Endpoint for logging in a user"""
    user_data = json.loads(request.data)
    account_model = AccountModel()
    try:
        user = UserModel(**user_data)
        user_info = account_model.login_user(user)
        # replace with JWT token
        session["token"] = user_info["user_id"]
        session["user_type"] = user_info["user_type"]
        return LoginResponse(**user_info).json(by_alias=True)
    except Exception as error:
        return LoginResponse(
            has_error=True,
            error_message=str(error)
        ).json(by_alias=True)


@account_view.route("/get_session", methods=["GET"])
def get_session():
    """Endpoint for logging in a user"""
    if 'token' in session:
        return jsonify({'session': session["user_type"]})
    else:
        return jsonify({'session': False})


@account_view.route("/logout", methods=["GET"])
def logout():
    """Endpoint for logging a user out"""
    session.pop('token', None)
    return 'OK', 201
