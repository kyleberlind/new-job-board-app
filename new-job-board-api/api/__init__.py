from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    from .views.hello_world_view import main
    CORS(app)
    app.register_blueprint(main)
    return app

if __name__ == "__main__":
    create_app()
