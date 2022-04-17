from os import getenv
from .statements import answers_statements

from psycopg2 import connect


class AnswersDAO:
    def __init__(self):
        self.statements = answers_statements.AnswersStatements()
        
    def insert(self, question_id, answer_prompt, correct):
        with connect(f'dbname={getenv("dbname")} user={getenv("user")} '
                     f'password={getenv("password")} host={getenv("host")}') as conn:
            cur = conn.cursor()
            cur.execute(query=self.statements.insert(), vars=(question_id, answer_prompt, correct,))

    def update(self, answer_id, prompt, correct):
        with connect(f'dbname={getenv("dbname")} user={getenv("user")} '
                     f'password={getenv("password")} host={getenv("host")}') as conn:
            cur = conn.cursor()
            cur.execute(query=self.statements.update(), vars=(prompt, correct, answer_id,))
