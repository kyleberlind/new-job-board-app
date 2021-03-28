"""03/04/2021"""
from flask_cors import CORS
from flask import Flask
from flask_graphql import GraphQLView
from flask_sqlalchemy import SQLAlchemy
from .api_secrets.aws_credentials import (
    BASE_DB_PATH
)


db = SQLAlchemy()


def create_app():
    """Creates the flask app"""
    app = Flask(__name__)
    app.secret_key = "super_secret"

    from .views.account_view import account_view
    from .views.employer_view import employer_view
    from .views.applicant_view import applicant_view
    from .schemas.schema import schema

    app.register_blueprint(account_view)
    app.register_blueprint(employer_view)
    app.register_blueprint(applicant_view)

    app.config["SESSION_COOKIE_NAME"] = 'session'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = BASE_DB_PATH + "job"
    app.config["SQLALCHEMY_BINDS"] = {
        'user': BASE_DB_PATH + "user",
    }
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "max_overflow": 15,
        "pool_pre_ping": True,
        "pool_recycle": 60 * 60,
        "pool_size": 10,
    }

    db.init_app(app)

    app.add_url_rule(
        '/graphql',
        view_func=GraphQLView.as_view(
            'graphql',
            schema=schema,
            graphiql=True
        )
    )

    CORS(app)
    return app


if __name__ == "__main__":
    create_app()
