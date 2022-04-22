from json import loads
from random import randint

from flask_restful import Resource, reqparse

from ..Database.DAO.answers_DAO import AnswersDAO
from ..Database.DAO.questions_DAO import QuestionsDAO
from ..Database.DAO.room_DAO import roomDAO
from ..Database.DAO.test_question_DAO import TestQuestionDAO
from ..Database.DAO.user_room_DAO import UserRoomDAO
from ..validation_kit import is_empty, is_number, is_positive, within_range, list_is_empty, check_if_room_exists

QuestionsDAO = QuestionsDAO()
AnswersDAO = AnswersDAO()
room_dao = roomDAO()
user_room_dao = UserRoomDAO()
test_question_dao = TestQuestionDAO()

# TODO: in general, make sure each POSTed input is not blank, but I will point out specific areas/things to test for
# Get and post api
class ApiHandler(Resource):
    class RoomAmount:
        def get(self):
            res = {}
            question_ids = test_question_dao.get_current_rooms()
            # Make the title the first child element of the JSON dict
            res['current_rooms'] = question_ids

            return res

    class Test(Resource):
        def get(self):
            test_questions = test_question_dao.get_all_test_questions()
            res = {}
            # Dict for the questions
            question_dict = {}
            # Organize the questions based off of what room they are in
            for x, y in test_questions:
                if x in question_dict:
                    question_dict[x].append(y)
                else:
                    question_dict[x] = [y]

            for row in test_questions:
                room_code = row[0]

                res[room_code] = {}

                res[room_code]['question_id'] = question_dict.get(row[0])

            return res

    # API implementation for the Join
    class Join(Resource):
        def get(self):
            res = {}
            user_rooms = user_room_dao.get_all_user_rooms()
            users_dict = {}
            # Organize the users based off of what room they are in
            for x, y in user_rooms:
                if y in users_dict:
                    users_dict[y].append(x)
                else:
                    users_dict[y] = [x]
            for row in user_rooms:
                user_id = row[1]
                res[user_id] = {}
                res[user_id]['users'] = users_dict.get(row[1])

            return res

        def post(self):
            # If type is 'edit', it overwrites
            parser = reqparse.RequestParser()
            parser.add_argument('type', type=str)
            parser.add_argument('message', type=str)

            args = parser.parse_args()

            request_type = args['type']
            request_json = args['message']

            request_json = request_json.replace("\'", "\"")

            # Parse JSON into an object with attributes corresponding to dict keys.
            data = loads(request_json)

            if request_type == 'add':
                user_id = data['join']['user_id']
                room_code = data['join']['room_code']
                # Create a room based off the following
                if not is_empty(user_id, room_code) and check_if_room_exists(room_code):
                    user_room_dao.add_user_to_room(user_id, room_code)
                    ret_status = "SUCCESS"
                    ret_msg = "SUCCESSFULLY ADDED"
                    final_ret = {"status": ret_status, "message": ret_msg}
                else:
                    ret_status = "FAILURE"
                    ret_msg = "UNSUCCESSFULLY ADDED"
                    # Return success status
                    final_ret = {"status": ret_status, "message": ret_msg}

            return final_ret

    class Room(Resource):
        def get(self):
            # {'room': {'room_code': 'a', 'question_duration': '60', 'room_points': '1234', 'title': 'titleName',
            # 'questions': {'13214', '131415' ...}}

            res = {}
            for row in (room_dao.get_all_rooms()):
                room_code = row[3]
                question_ids = test_question_dao.get_all_by_room_code(room_code)
                question_duration = row[0]

                # Title of room
                title = row[2]
                # Amount of points in the room
                room_points = row[1]
                # Make the room code the parent key of the JSON dict
                res[room_code] = {}
                # Make the title the first child element of the JSON dict
                res[room_code]['title'] = title
                res[room_code]['question_duration'] = question_duration
                res[room_code]['room_points'] = room_points
                # List the question ID's
                res[room_code]["questions"] = question_ids

            return res

        def post(self):
            # If type is 'edit', it overwrites
            parser = reqparse.RequestParser()
            parser.add_argument('type', type=str)
            parser.add_argument('message', type=str)

            args = parser.parse_args()

            request_type = args['type']
            request_json = args['message']

            request_json = request_json.replace("\'", "\"")

            # Parse JSON into an object with attributes corresponding to dict keys.
            data = loads(request_json)

            if request_type == 'add':
                duration = data['room']['question_duration']
                room_points = data['room']['room_points']
                title = data['room']['title']
                questions = data['room']['questions']
                # Create a random 6 digit room code
                result_id = '100' + str(randint(100, 999))
                # Create a room based off the following
                room_dao.create_room(result_id, data['room']['question_duration'], data['room']['room_points'],
                                     data['room']['title'])
                # Insert each passed room_code into the test_question relation
                for question_id in data['room']['questions']:
                    test_question_dao.insert_question_by_room_code(result_id, question_id)

                    ret_status = "SUCCESS"
                    ret_msg = "SUCCESSFULLY ADDED"

                # Return success status
                final_ret = {"status": ret_status, "message": ret_msg, "code": result_id}

                return final_ret
            else:
                ret_status = "UNSUCCESSFUL"
                ret_msg = "UNSUCCESSFULLY ADDED"

                # Return success status
                final_ret = {"status": ret_status, "message": ret_msg}

                return final_ret

    class Questions(Resource):
        def get(self):
            # Returns all QuestionsDAO.get_all()
            res = {}

            for row in (QuestionsDAO.get_all_with_answers()):
                question_id = row[0]
                prompt = row[1]

                # 2, 'Ans1', True
                ans_id = row[2]
                ans_prompt = row[3]
                ans_true = row[4]

                if question_id not in res:
                    res[question_id] = {}
                    res[question_id]["answers"] = {}
                    res[question_id]["prompt"] = prompt

                res[question_id]["answers"][ans_id] = ans_prompt

                if ans_true:
                    res[question_id]["correct"] = ans_id

            return res

        def post(self):
            # If type is 'edit', it overwrites 
            parser = reqparse.RequestParser()
            parser.add_argument('type', type=str)
            parser.add_argument('message', type=str)

            args = parser.parse_args()

            request_type = args['type']
            request_json = args['message']

            request_json = request_json.replace("\'", "\"")

            # Parse JSON into an object with attributes corresponding to dict keys.
            data = loads(request_json)

            if request_type == 'edit':
                # {'question': {'prompt': 'a', 'answers': {'5': 'b', '6': 'c', '7': 'd', '8': 'e'}, 'correct': '5'}}

                # Update answers
                if not is_empty(data['question']['answers'].items()):
                    for answer_id, answer_prompt in data['question']['answers'].items():
                        is_correct = str(answer_id) == str(data['question']['correct'])
                        AnswersDAO.update(answer_id, answer_prompt, is_correct)

                    # Update question
                    QuestionsDAO.update(data['question']['question_id'], data['question']['prompt'])

                    ret_status = "SUCCESS"
                    ret_msg = "SUCCESSFULLY EDITED"

                    final_ret = {"status": ret_status, "message": ret_msg}
                else:
                    ret_status = "UNSUCCESSFUL"
                    ret_msg = "UNSUCCESSFULLY EDITED"

                    final_ret = {"status": ret_status, "message": ret_msg}

            elif (request_type == 'add'):
                if not is_empty(data['question']['answers'], data['question']['prompt']):
                    result_id = QuestionsDAO.insert(data['question']['prompt'])
                    AnswersDAO.insert(result_id, data['question']['answers']['0'], data['question']['correct'] == '0')
                    AnswersDAO.insert(result_id, data['question']['answers']['1'], data['question']['correct'] == '1')
                    AnswersDAO.insert(result_id, data['question']['answers']['2'], data['question']['correct'] == '2')
                    AnswersDAO.insert(result_id, data['question']['answers']['3'], data['question']['correct'] == '3')

                    ret_status = "SUCCESS"
                    ret_msg = "SUCCESSFULLY ADDED"

                    final_ret = {"status": ret_status, "message": ret_msg}
                else:
                    ret_status = "UNSUCCESSFUL"
                    ret_msg = "UNSUCCESSFULLY ADDED"

                    final_ret = {"status": ret_status, "message": ret_msg}

            return final_ret
