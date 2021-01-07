from flask_cors import CORS
from flask import Flask


def create_app():
    """Creates the flask app"""
    app = Flask(__name__)
    app.secret_key = "super_secret"

    from .views.account_view import account_view
    from .views.hello_world_view import hello_world_view

    app.register_blueprint(account_view)
    app.register_blueprint(hello_world_view)
    CORS(app)

    return app


if __name__ == "__main__":
    create_app()
