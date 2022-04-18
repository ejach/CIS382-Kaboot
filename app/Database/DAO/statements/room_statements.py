class RoomStatements:
    def __init__(self):
        self.stmt = None

    def insert(self):
        self.stmt = 'INSERT INTO room (room_code, question_duration, room_points, title) VALUES (%s, %s, %s, %s)'
        return self.stmt

    def get_room_by_room_code(self):
        self.stmt = 'SELECT * from room WHERE room_code = %s'
        return self.stmt

    def update_duration(self):
        self.stmt = 'UPDATE room SET question_duration = %s WHERE room_code = %s'
        return self.stmt

    def get_room_points(self):
        self.stmt = 'SELECT (room_points) FROM room WHERE room_code = %s'
        return self.stmt
