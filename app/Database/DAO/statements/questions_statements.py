class QuestionsStatements:
    def __init__(self):
        self.stmt = None

    def get_select_statement_by_id(self):
        self.stmt = 'SELECT * FROM question WHERE question_id = %s'
        return self.stmt

    def fetchall(self):
        self.stmt = 'SELECT * FROM question NATURAL JOIN answer'
        return self.stmt

    def insert(self):
        self.stmt = 'INSERT INTO question (prompt) VALUES (%s) RETURNING question_id'
        return self.stmt

    def update(self):
        self.stmt = 'UPDATE question SET prompt = %s WHERE question_id = %s'
        return self.stmt


