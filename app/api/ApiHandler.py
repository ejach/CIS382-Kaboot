from flask import request
from flask_restful import Api, Resource, reqparse
from ..Database.DAO.questions_DAO import QuestionsDAO

QuestionsDAO = QuestionsDAO()

class ApiHandler(Resource):
    class Questions(Resource):
        def get(self):
            # Returns all questionsQuestionsDAO
            # return QuestionsDAO.get_all()
            return {
                "resultStatus": "SUCCESS",
                "result": {
                    "Q_ID": {
                        "prompt": "This is an example question0",
                        "answers": {
                            "A_ID": "Answer1",
                            "A_ID2": "This is an answer, which is Answer2",
                            "A_ID3": "This is an answer, which is Answer3",
                            "A_ID4": "This is an answer, which is Answer4"
                        },
                        "correct": "A_ID2"
                    },
                    "Q_ID2": {
                        "prompt": "This is an example question2",
                        "answers": {
                            "A_ID5": "This is an answer, which is Answer5",
                            "A_ID6": "This is an answer, which is Answer6",
                            "A_ID7": "This is an answer, which is Answer7",
                            "A_ID8": "This is an answer, which is Answer8"
                        },
                        "correct": "A_ID5"
                    },
                    "Q_ID3": {
                        "prompt": "This is an example question3",
                        "answers": {
                            "A_ID9": "This is an answer, which is Answer9",
                            "A_ID10": "This is an answer, which is Answer10",
                            "A_ID11": "This is an answer, which is Answer11",
                            "A_ID12": "This is an answer, which is Answer12"
                        },
                        "correct": "A_ID10"
                    },
                    "Q_ID4": {
                        "prompt": "This is an example question4",
                        "answers": {
                            "A_ID13": "This is an answer, which is Answer13",
                            "A_ID14": "This is an answer, which is Answer14",
                            "A_ID15": "This is an answer, which is Answer15",
                            "A_ID16": "This is an answer, which is Answer16"
                        },
                        "correct": "A_ID16"
                    },
                    "Q_ID5": {
                        "prompt": "This is an example question5",
                        "answers": {
                            "A_ID17": "This is an answer, which is Answer17",
                            "A_ID18": "This is an answer, which is Answer18",
                            "A_ID19": "This is an answer, which is Answer19",
                            "A_ID20": "This is an answer, which is Answer20"
                        },
                        "correct": "A_ID19"
                    }
                }
            }

    def post(self):
        # If type is 'edit', it overwrites 
        parser = reqparse.RequestParser()
        parser.add_argument('type', type=str)
        parser.add_argument('message', type=str)

        args = parser.parse_args()

        request_type = args['type']
        request_json = args['message']
        
        
        if(request_type == 'edit'):
            ret_status = "SUCCESS"
            ret_msg = "SUCCESSFULLY EDITED"

            # TODO: Edit database here based on request_json
            
            final_ret = {"status": ret_status, "message": ret_msg}
        elif(request_type == 'add'):
            ret_status = "SUCCESS"
            ret_msg = "SUCCESSFULLY ADDED"

            # TODO: Insert into database here based on request_json

            final_ret = {"status": ret_status, "message": ret_msg}

        return final_ret
