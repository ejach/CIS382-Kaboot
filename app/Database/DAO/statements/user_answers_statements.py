class UserAnswersStatements:
    def __init__(self):
        self.stmt = None

    def submit_answer(self):
        self.stmt = 'INSERT INTO user_answers (test_id, question_id, user_id, answer_id) VALUES (%s, %s, %s, %s)'
        return self.stmt
