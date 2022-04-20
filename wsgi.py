from os import environ

from app.views import app
from app.views import socketio

if __name__ == '__main__':
    port = int(environ.get('PORT', 5000))
    # app.run(host='0.0.0.0', port=port)
    socketio.run(app)