from flask import request
from flask_restful import Api, Resource, reqparse
from ..Database.DAO.questions_DAO import QuestionsDAO
from ..Database.DAO.answers_DAO import AnswersDAO

import json

QuestionsDAO = QuestionsDAO()
AnswersDAO = AnswersDAO()

class ApiHandler(Resource):
    class Questions(Resource):
        def get(self):
            # Returns all QuestionsDAO.get_all()
            res = {}

            for row in(QuestionsDAO.get_all_with_answers()):
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
            data = json.loads(request_json)
            
            if(request_type == 'edit'):
                # {'question': {'prompt': 'a', 'answers': {'5': 'b', '6': 'c', '7': 'd', '8': 'e'}, 'correct': '5'}}
                    
                # Update answers
                for answer_id, answer_prompt in data['question']['answers'].items():
                    is_correct = str(answer_id) == str(data['question']['correct'])
                    AnswersDAO.update(answer_id, answer_prompt, is_correct)


                # Update question


                ret_status = "SUCCESS"
                ret_msg = "SUCCESSFULLY EDITED"
                
                final_ret = {"status": ret_status, "message": ret_msg}
            elif(request_type == 'add'):
                result_id = QuestionsDAO.insert(data['question']['prompt'])
                AnswersDAO.insert(result_id, data['question']['answers']['0'], data['question']['correct'] == '0')
                AnswersDAO.insert(result_id, data['question']['answers']['1'], data['question']['correct'] == '1')
                AnswersDAO.insert(result_id, data['question']['answers']['2'], data['question']['correct'] == '2')
                AnswersDAO.insert(result_id, data['question']['answers']['3'], data['question']['correct'] == '3')

                ret_status = "SUCCESS"
                ret_msg = "SUCCESSFULLY ADDED"

                final_ret = {"status": ret_status, "message": ret_msg}

            return final_ret
