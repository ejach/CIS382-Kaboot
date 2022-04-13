from os import getenv
from .statements import questions_statements

from psycopg2 import connect


class QuestionsDAO:
    def __init__(self, question_id=None, prompt=None):
        self.question_id = question_id
        self.prompt = prompt
        self.statements = questions_statements.QuestionsStatements()

    def get_all(self):
        with connect(f'dbname={getenv("dbname")} user={getenv("user")} '
                     f'password={getenv("password")} host={getenv("host")}') as conn:
            cur = conn.cursor()
            cur.execute(self.statements.fetchall())
            res = cur.fetchall()
            return res

    def insert(self, prompt):
        with connect(f'dbname={getenv("dbname")} user={getenv("user")} '
                     f'password={getenv("password")} host={getenv("host")}') as conn:
            cur = conn.cursor()
            cur.execute(query=self.statements.insert(), vars=(prompt,))

    def get_by_id(self, row_id):
        with connect(f'dbname={getenv("dbname")} user={getenv("user")} '
                     f'password={getenv("password")} host={getenv("host")}') as conn:
            cur = conn.cursor()
            cur.execute(query=self.statements.get_select_statement_by_id(), vars=(row_id,))
            res = cur.fetchall()
            return res

    def update(self, row_id, prompt):
        with connect(f'dbname={getenv("dbname")} user={getenv("user")} '
                     f'password={getenv("password")} host={getenv("host")}') as conn:
            cur = conn.cursor()
            cur.execute(query=self.statements.update(), vars=(prompt, row_id))
