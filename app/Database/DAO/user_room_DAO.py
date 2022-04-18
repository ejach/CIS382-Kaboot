from app.Database.decorators.db_connector import with_connection
from app.Database.DAO.statements.user_room_statements import UserRoomStatments


class UserRoomDAO:
    def __init__(self):
        self.statements = UserRoomStatments()

    @with_connection
    def add_user_to_room(self, user_id, room_id, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.add_user_to_room(), vars=(user_id, room_id))
