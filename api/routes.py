from api import app
from api.models import User
from api import db


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route('/test/<first>/<second>')
def databasetest(first=None, second=None):
    me = User(first, second)
    db.session.add(me)
    db.session.commit()
    return "Hello %s %s" % (first, second)
