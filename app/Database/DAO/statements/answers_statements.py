class AnswersStatements:
    def __init__(self):
        self.stmt = None

    def insert(self):
        self.stmt = 'INSERT INTO answers (question_id, answer_prompt, correct) VALUES (%s, %s, %s)'
        return self.stmt

    def update(self):
        self.stmt = 'UPDATE answers SET answer_prompt = %s, correct = %s WHERE answer_id = %s'
        return self.stmt