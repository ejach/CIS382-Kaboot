from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
from app.api.ApiHandler import ApiHandler

app = Flask(__name__, static_url_path='', static_folder='static/public')
CORS(app) #comment this on deployment
api = Api(app)

@app.route('/', methods=['GET', 'POST'])
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(ApiHandler.Questions, '/flask/api/questions', methods=['GET', 'POST'])