import json
from flask import Blueprint, jsonify, request
from ..models.account_model import AccountModel
from ..models.user_model import UserModel
from ..utilities.response import LoginResponse, SignUpResponse

main = Blueprint("main", __name__)


@main.route("/sign_up_user", methods=["POST"])
def sign_up_user():
    """End point for signing up a new user"""
    user_data = json.loads(request.data)
    account_model = AccountModel()
    try:
        user = UserModel(**user_data)
        return SignUpResponse(
            new_user_id=account_model.sign_up_user(user)
        ).json(by_alias=True)
    except Exception as error:
        return SignUpResponse(
            has_error=True,
            error_message=str(error)
        ).json(by_alias=True)


@main.route("/login_user", methods=["GET"])
def login_user():
    """Endpoint for logging in a user"""
    user_data = json.loads(request.data)
    account_model = AccountModel()
    try:
        user = UserModel(**user_data)
        return LoginResponse(
            user_id=account_model.login_user(user)
        ).json(by_alias=True)
    except Exception as error:
        return LoginResponse(
            has_error=True,
            error_message=str(error)
        ).json(by_alias=True)
