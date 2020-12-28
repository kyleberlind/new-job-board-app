import json
from flask import Blueprint, jsonify, request
from ..models.account_model import AccountModel
from ..models.user_model import UserModel

main = Blueprint("main", __name__)


@main.route("/sign_up_user", methods=["POST"])
def sign_up_user():
    """End point for signing up a new user"""
    user_data = json.loads(request.data)["user_data"]
    account_model = AccountModel()
    try:
        user = UserModel(**user_data)
        return jsonify({"new_user_id": account_model.sign_up_user(user)})
    except Exception as error:
        #TODO what do we want to return in these?
        return False


@main.route("/login_user", methods=["POST"])
def login_user():
    """Endpoint for logging in a user"""
    user_data = json.loads(request.data)["user_data"]
    account_model = AccountModel()
    try:
        user = UserModel(**user_data)
        return jsonify({"userId": account_model.login_user(user)})
    except Exception as error:
        #TODO what do we want to return in these?
        return False
