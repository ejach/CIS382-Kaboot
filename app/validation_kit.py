import string


def is_empty(input_str):
    if not input_str:
        return False
    return True


def within_range(num, lower_num, upper_num):
    return upper_num >= num > lower_num


def is_number(num):
    return type(num) == int or type(num) == float


def is_positive(num):
    return num > 0


def is_string(input_str):
    return type(input_str) == string



# class ValidationKit:
