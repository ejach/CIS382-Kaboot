from app.Database.decorators.db_connector import with_connection
from .statements import answers_statements


class AnswersDAO:
    def __init__(self):
        self.statements = answers_statements.AnswersStatements()

    @with_connection
    def insert(self, question_id, answer_prompt, correct, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.insert(), vars=(question_id, answer_prompt, correct,))

    @with_connection
    def update(self, answer_id, prompt, correct, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.update(), vars=(prompt, correct, answer_id,))
