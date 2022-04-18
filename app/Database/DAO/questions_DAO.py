from .statements import questions_statements
from ..decorators.db_connector import with_connection


class QuestionsDAO:
    def __init__(self):
        self.statements = questions_statements.QuestionsStatements()

    @with_connection
    def get_all_with_answers(self, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(self.statements.fetchall())
        res = cur.fetchall()
        return res

    @with_connection
    def insert(self, prompt, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.insert(), vars=(prompt,))
        res = cur.fetchone()
        return res

    @with_connection
    def get_by_id(self, row_id, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.get_select_statement_by_id(), vars=(row_id,))
        res = cur.fetchall()
        return res

    @with_connection
    def update(self, row_id, prompt, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.update(), vars=(prompt, row_id))
