from app.Database.DAO.statements.test_question_statements import TestQuestionStatements
from app.Database.decorators.db_connector import with_connection


class TestQuestionDAO:
    def __init__(self):
        self.stmt = TestQuestionStatements()

    @with_connection
    def get_all_test_questions(self, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.stmt.get_all_test_questions())
        return cur.fetchall()

    @with_connection
    def get_all_by_room_code(self, room_code, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.stmt.get_all_by_room_code(), vars=(room_code,))
        res = [i[0] for i in cur.fetchall()]
        return res

    @with_connection
    def insert_question_by_room_code(self, room_code, question_id, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.stmt.insert_question_by_room_code(), vars=(room_code, question_id))
