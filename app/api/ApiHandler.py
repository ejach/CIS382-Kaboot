from json import loads
from random import randint

from flask_restful import Resource, reqparse

from ..Database.DAO.answers_DAO import AnswersDAO
from ..Database.DAO.questions_DAO import QuestionsDAO
from ..Database.DAO.room_DAO import roomDAO
from ..Database.DAO.test_question_DAO import TestQuestionDAO
from ..validation_kit import is_empty, is_number, is_string, is_positive, within_range

QuestionsDAO = QuestionsDAO()
AnswersDAO = AnswersDAO()
room_dao = roomDAO()
test_question_dao = TestQuestionDAO()

# TODO: in general, make sure each POSTed input is not blank, but I will point out specific areas/things to test for
class ApiHandler(Resource):
    class Room(Resource):
        def get(self):
            # {'room': {'room_code': 'a', 'question_duration': '60', 'room_points': '1234', 'title': 'titleName',
            # 'questions': {'13214', '131415' ...}}

            res = {}
            for row in (room_dao.get_all_rooms()):
                room_code = row[0]
                question_ids = test_question_dao.get_all_by_room_code(room_code)
                question_duration = row[1]

                # Title of room
                title = row[3]
                # Amount of points in the room
                room_points = row[2]
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

            # TODO: make sure question_duration is less than or equal to 60 before creating,
            #   and make sure each input is not blank
            if is_empty(data['room']['question_duration']):
                raise ValueError('Input is empty')

            if not is_number(data['room']['question_duration']):
                raise TypeError('Question duration must be numeric')

            if within_range(data['room']['question_duration'], 0, 60):
                raise ValueError('Question duration must be less than or equal to 60 seconds')

            if is_empty(data['room']['room_points']):
                raise ValueError('Input is empty')

            if is_empty(data['room']['title']):
                raise ValueError('Input is empty')

            if request_type == 'add':
                # Create a random 6 digit room code
                result_id = ''.join([str(randint(0, 999)).zfill(3) for _ in range(2)])
                # Create a room based off the following
                room_dao.create_room(result_id, data['room']['question_duration'], data['room']['room_points'],
                                     data['room']['title'])
                # Insert each passed room_code into the test_question relation
                for questions in data['room']['questions']:
                    test_question_dao.insert_question_by_room_code(result_id, questions)

                ret_status = "SUCCESS"
                ret_msg = "SUCCESSFULLY ADDED"

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

            if (request_type == 'edit'):
                # {'question': {'prompt': 'a', 'answers': {'5': 'b', '6': 'c', '7': 'd', '8': 'e'}, 'correct': '5'}}

                # Update answers
                # TODO: Make sure that these are not blank before updating
                for answer_id, answer_prompt in data['question']['answers'].items():
                    if is_empty(answer_id):
                        raise ValueError('Input is empty')

                    if is_empty(answer_prompt):
                        raise ValueError('Input is empty')

                for answer_id, answer_prompt in data['question']['answers'].items():
                    is_correct = str(answer_id) == str(data['question']['correct'])
                    AnswersDAO.update(answer_id, answer_prompt, is_correct)

                # Update question
                QuestionsDAO.update(data['question']['question_id'], data['question']['prompt'])

                ret_status = "SUCCESS"
                ret_msg = "SUCCESSFULLY EDITED"

                final_ret = {"status": ret_status, "message": ret_msg}

            elif (request_type == 'add'):
                # TODO: Make sure that these are not blank before inserting
                for index in range(4):
                    if is_empty(data['question']['answers'][str(index)]):
                        raise ValueError('Input is empty')

                result_id = QuestionsDAO.insert(data['question']['prompt'])
                AnswersDAO.insert(result_id, data['question']['answers']['0'], data['question']['correct'] == '0')
                AnswersDAO.insert(result_id, data['question']['answers']['1'], data['question']['correct'] == '1')
                AnswersDAO.insert(result_id, data['question']['answers']['2'], data['question']['correct'] == '2')
                AnswersDAO.insert(result_id, data['question']['answers']['3'], data['question']['correct'] == '3')

                ret_status = "SUCCESS"
                ret_msg = "SUCCESSFULLY ADDED"

                final_ret = {"status": ret_status, "message": ret_msg}

            return final_ret
