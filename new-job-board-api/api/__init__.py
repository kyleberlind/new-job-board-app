from flask_cors import CORS
from flask import Flask


def create_app():
    """Creates the flask app"""
    app = Flask(__name__)

    from .views.account_view import main
    CORS(app)
    app.register_blueprint(main)
    return app


if __name__ == "__main__":
    create_app()
