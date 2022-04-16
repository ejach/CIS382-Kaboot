from ..decorators.db_connector import with_connection
from .statements.room_statements import RoomStatements


class roomDAO:
    def __init__(self, room_code=None, duration=None):
        self.room_code = room_code
        self.duration = duration
        self.statements = RoomStatements()

    @with_connection
    def create_room(self, room_code, duration, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.insert(), vars=(room_code, duration))

    @with_connection
    def get_room_by_room_code(self, room_code, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.get_room_by_room_code(), vars=(room_code,))
        return cur.fetchall()

    @with_connection
    def update_duration(self, room_code, duration, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.update_duration(), vars=(duration, room_code))

    @with_connection
    def get_room_points(self, room_code, **kwargs):
        cnn = kwargs.pop('cnn')
        cur = cnn.cursor()
        cur.execute(query=self.statements.get_room_points(), vars=(room_code,))
        return cur.fetchall()
