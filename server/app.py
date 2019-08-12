#!flask/bin/python
from flask import Flask
from flask_cors import CORS
from src.views import home_view

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['ENV'] = 'development' # eventually use .env instead for deploymenet
    app.debug = True
    app.register_blueprint(home_view)  # register urls
    return app

if __name__ == '__main__':
    app = create_app()
    app.run()
