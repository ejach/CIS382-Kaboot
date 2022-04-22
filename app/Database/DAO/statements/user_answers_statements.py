class UserAnswersStatements:
    def __init__(self):
        self.stmt = None

    def submit_answer(self):
        self.stmt = 'INSERT INTO user_answer (room_code, question_id, user_id, answer_id) VALUES (%s, %s, %s, %s)'
        return self.stmt

    def get_all_room_answers(self):
        self.stmt = 'WITH user_question_answers AS (SELECT * FROM test_question LEFT OUTER JOIN user_answer USING(question_id) WHERE test_question.room_code=%s) \
SELECT user_question_answers.question_id, user_id, answer_id, correct FROM user_question_answers LEFT OUTER JOIN answer USING(answer_id)'
        return self.stmt
