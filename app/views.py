from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from flask_restful import Api

from app.api.ApiHandler import ApiHandler
from flask_socketio import SocketIO, send, join_room

app = Flask(__name__, static_url_path='', static_folder='static/public')
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')
api = Api(app)

@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

@socketio.on('enterRoom')
def enter_room(room_code, user):
    join_room(room_code)
    send({'prompt': user + ' has entered the room.'}, to=room_code)
    ApiHandler.Join().post({
        'type': 'add',
        'message': {
            'join': {
                'room_code': room_code,
                'user_id': user,
            }
        }
    })

@socketio.on('submitAnswer')
def submit_answer(room_code, user, question_id, answerIndex, letter):
    send({'user': user, 'answer': letter, 'type': 'answer'}, to=room_code)
    ApiHandler.Submit().post({
        'type': 'add',
        'message': {
            'submit': {
                'room_code': room_code,
                'user_id': user,
                'answer_id': answerIndex,
                'question_id': question_id
            }
        }
    })

@socketio.on('advanceQuestion')
def advance_question(room_code):
    send({'type': 'advanceQuestion'}, to=room_code)

# API Route for question
api.add_resource(ApiHandler.Questions, '/flask/api/question')
# API Route for room
api.add_resource(ApiHandler.Room, '/flask/api/room')
# API Route for join
api.add_resource(ApiHandler.Join, '/flask/api/join')
# API Route for submissions
api.add_resource(ApiHandler.Submit, '/flask/api/submit')
# API Route for test
api.add_resource(ApiHandler.Test, '/flask/api/test')
