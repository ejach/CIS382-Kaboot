from .Database.DAO.room_DAO import roomDAO


def is_empty(*args):
    for arg in args:
        if not arg:
            return True
        else:
            return False


def list_is_empty(li):
    if not li:
        return True
    else:
        return False


def within_range(num, upper_num):
    return int(num) <= int(upper_num)


def is_number(num):
    return num.isnumeric()


def is_positive(num):
    return num > 0


def is_string(input_str):
    if input_str.isalpha():
        return True
    else:
        return False


def check_if_room_exists(room_code):
    room_dao = roomDAO()
    res = room_dao.get_room_by_room_code(room_code)
    if not res:
        return False
    else:
        return True
