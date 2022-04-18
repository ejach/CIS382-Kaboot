from ..decorators.db_connector import with_connection
from .statements.user_answers_statements import UserAnswersStatements


class UserAnswersDAO:
    def __init__(self, room_code=None, question_id=None, answer_id=None, user_id=None):
        self.room_code = room_code
        self.question_id = question_id
        self.user_id = user_id
        self.answer_id = answer_id
        self.stmt = UserAnswersStatements()

    @with_connection
    def submit_answer(self, room_code, question_id, user_id, answer_id, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.stmt.submit_answer(), vars=(room_code, question_id, user_id, answer_id))
