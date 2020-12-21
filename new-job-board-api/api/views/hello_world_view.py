from flask import Blueprint, jsonify


main = Blueprint('main', __name__)

@main.route('/get_hello_world', methods=['GET'])
def get_hello_world():
     return jsonify({'message': 'Hello World'})
