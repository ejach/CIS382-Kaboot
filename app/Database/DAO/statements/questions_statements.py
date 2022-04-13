class QuestionsStatements:
    def __init__(self):
        self.stmt = None

    def get_select_statement_by_id(self):
        self.stmt = 'SELECT * FROM questions WHERE question_id = %s'
        return self.stmt

    def fetchall(self):
        self.stmt = 'SELECT * FROM questions'
        return self.stmt

    def insert(self):
        self.stmt = 'INSERT INTO questions (prompt) VALUES (%s)'
        return self.stmt

    def update(self):
        self.stmt = 'UPDATE questions SET prompt = %s WHERE question_id = %s'
        return self.stmt


