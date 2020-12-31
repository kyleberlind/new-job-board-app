from flask import Blueprint, jsonify

hello_world_view = Blueprint('hello_world_view', __name__)


@hello_world_view.route('/get_hello_world', methods=['GET'])
def get_hello_world():
    return jsonify({'message': 'Hello World'})
