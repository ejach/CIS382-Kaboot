from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_restful import Api

from app.api.ApiHandler import ApiHandler

app = Flask(__name__, static_url_path='', static_folder='static/public')
CORS(app)
api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


# API Route for questions
api.add_resource(ApiHandler.Questions, '/flask/api/questions')
# API Route for room
api.add_resource(ApiHandler.Room, '/flask/api/room')
# API Route for join
api.add_resource(ApiHandler.Join, '/flask/api/join')
# API Route for test
api.add_resource(ApiHandler.Test, '/flask/api/test')
