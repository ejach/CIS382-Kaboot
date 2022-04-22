from ..decorators.db_connector import with_connection
from .statements.user_answers_statements import UserAnswersStatements


class UserAnswersDAO:
    def __init__(self):
        self.stmt = UserAnswersStatements()

    @with_connection
    def submit_answer(self, room_code, question_id, user_id, answer_id, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.stmt.submit_answer(), vars=(room_code, question_id, user_id, answer_id))

    @with_connection
    def get_room_answers(self, room_code, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.stmt.get_all_room_answers(), vars=(room_code,))
        res = cur.fetchall()
        return res