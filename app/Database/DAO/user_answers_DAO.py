from ..decorators.db_connector import with_connection
from .statements.user_answers_statements import UserAnswersStatements


class UserAnswersDAO:
    def __init__(self, test_id=None, question_id=None, answer_id=None, user_id=None):
        self.test_id = test_id
        self.question_id = question_id
        self.user_id = user_id
        self.answer_id = answer_id
        self.stmt = UserAnswersStatements()

    @with_connection
    def submit_answer(self, test_id, question_id, user_id, answer_id, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.stmt.submit_answer(), vars=(test_id, question_id, user_id, answer_id))