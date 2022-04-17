class UserRoomStatments:
    def __init__(self):
        self.stmt = None

    def add_user_to_room(self):
        self.stmt = 'INSERT INTO user_room (user_id, room_id) VALUES (%s, %s)'
        return self.stmt


