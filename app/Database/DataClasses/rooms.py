class Questions:
    def __init__(self, room_code, question_duration, room_points):
        self.room_code = room_code
        self.question_duration = question_duration
        self.room_points = room_points

    def get_room_points(self):
        return self.room_points

    def get_question_duration(self):
        return self.question_duration

    def get_room_code(self):
        return self.room_code
