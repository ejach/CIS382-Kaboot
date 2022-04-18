class UserAnswers:
    def __init__(self, room_code, question_id, user_id, answer_id):
        self.room_code = room_code
        self.question_id = question_id
        self.user_id = user_id
        self.answer_id = answer_id

    def get_answer_id(self):
        return self.answer_id

    def get_user_id(self):
        return self.user_id

    def get_question_id(self):
        return self.question_id

    def get_room_code(self):
        return self.room_code
