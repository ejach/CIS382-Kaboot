class UserAnswers:
    def __init__(self, test_id, question_id, user_id, answer_id):
        self.test_id = test_id
        self.question_id = question_id
        self.user_id = user_id
        self.answer_id = answer_id

    def get_answer_id(self):
        return self.answer_id

    def get_user_id(self):
        return self.user_id

    def get_question_id(self):
        return self.question_id

    def get_test_id(self):
        return self.test_id
