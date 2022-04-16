from os import getenv

from psycopg2 import connect

cnn = None


def with_connection(f):
    def with_connection_(*args, **kwargs):
        cnn = connect(f'dbname={getenv("dbname")} user={getenv("user")} '
                      f'password={getenv("password")} host={getenv("host")}')
        try:
            rv = f(cnn=cnn, *args, **kwargs)
        except Exception:
            cnn.rollback()
            raise
        else:
            cnn.commit()
        finally:
            cnn.close()

        return rv

    return with_connection_
