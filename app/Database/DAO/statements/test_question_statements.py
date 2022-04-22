class TestQuestionStatements:
    def __init__(self):
        self.stmt = None

    def get_all_by_room_code(self):
        self.stmt = 'SELECT * FROM test_question NATURAL JOIN question NATURAL JOIN answer WHERE room_code = %s'
        return self.stmt

    def insert_question_by_room_code(self):
        self.stmt = 'INSERT INTO test_question (room_code, question_id) VALUES (%s, %s)'
        return self.stmt

    def get_all_test_questions(self):
        self.stmt = 'SELECT * FROM test_question'
        return self.stmt

    def select_get_current_rooms(self):
        self.stmt = 'SELECT "get_room_members"(%s)'
        return self.stmt
