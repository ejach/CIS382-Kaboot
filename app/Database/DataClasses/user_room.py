class UserRoom:
    def __init__(self, user_id=None, room_id=None):
        self.user_id = user_id
        self.room_id = room_id

    def get_user_id(self):
        return self.user_id

    def get_room_id(self):
        return self.room_id
