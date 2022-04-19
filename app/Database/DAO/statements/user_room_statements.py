class UserRoomStatements:
    def __init__(self):
        self.stmt = None

    def add_user_to_room(self):
        self.stmt = 'INSERT INTO user_room (user_id, room_code) VALUES (%s, %s)'
        return self.stmt

    def get_all_user_rooms(self):
        self.stmt = 'SELECT * FROM user_room'
        return self.stmt
