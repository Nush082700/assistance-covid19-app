from sqlalchemy.inspection import inspect
from flask_api import status

from flask import Flask, render_template, url_for, request, redirect, jsonify, Response, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from collections import OrderedDict
import os
from flask_migrate import Migrate
from math import radians, cos, sin, asin, sqrt, acos
from operator import itemgetter
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user, login_required, logout_user, UserMixin
from datetime import datetime
from time import time

app = Flask(__name__, static_url_path='',
            static_folder='frontend/build')
CORS(app)
app.config['SECRET_KEY'] = '88ce7599461ab697885b739ad0971f37d1fb9d3d758dc726fea9c586d07b7ff6'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://yvsdbbygynanhv:4621ee9546238883d5abdd451d7a7b6f579e4f8242ca2aa57c8bee4110cc95c7@ec2-54-157-78-113.compute-1.amazonaws.com:5432/d20701ijn8dq6g'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://fzmmhnvdwnhyas:78082b19b58ea424aaddcfa7bc2d87b59610bf9826d2aee0779abb8dac22369a@ec2-18-235-97-230.compute-1.amazonaws.com:5432/d7r9sk576t8up'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.user_id == int(id)).first()


class User(UserMixin, db.Model):
    __tablename__ = 'User'

    user_id = db.Column(db.INTEGER, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(25), nullable=False, unique=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    Help_logs = db.relationship("Todo", backref="Helpee", lazy="dynamic", foreign_keys='Todo.helpee_id')
    Helper_logs = db.relationship("Todo", backref="Helper", lazy="dynamic", foreign_keys='Todo.helper_id')
    sent_msg = db.relationship("Chat", backref = "Sender", lazy="dynamic", foreign_keys='Chat.sender_id')
    rec_msg = db.relationship("Chat", backref = "Receiver", lazy="dynamic", foreign_keys='Chat.receiver_id')
    last_seen = db.Column(db.DateTime)
    # notifications = db.relationship("Notifications", backref="user_notif", lazy="dynamic")

    def __init__(self, user_name, email, latitude, longitude):
        self.user_name = user_name
        self.email = email
        self.latitude = latitude
        self.longitude = longitude
        self.last_seen = None

    def get_id(self):
        return (self.user_id)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


    def msg_notifications(self):
        time_last_seen = self.last_seen or datetime(1900,1,1)
        return Chat.query.filter_by(Receiver=self).filter(Chat.timestamp > last_seen).count()

    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result

    # def add_notification(self, name, data):
    #     self.notifications.filter_by(user_name=name).delete()
    #     notif = Notifications(name=name, payload_json=json.dumps(data), user_notif=self)
    #     db.session.add(notif)
    #     return notif


class Todo(db.Model):
    __tablename__ = 'assistance'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    helpee_id = db.Column(db.Integer, db.ForeignKey(
        'User.user_id'), nullable=False)
    content = db.Column(db.String())
    short_content = db.Column(db.String())
    helper_id = db.Column(db.Integer, db.ForeignKey(
        'User.user_id'), nullable=False)

    def __init__(self, content, helpee_id, short_content, helper_id=0):
        self.content = content
        self.helpee_id = helpee_id
        self.helper_id = helper_id
        self.short_content = short_content

    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result

    def __repr__(self):
        return '<Task %r>' % self.id

    def get_id(self):
        return self.id

class Chat(db.Model):
    __tablename__= 'chat'

    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('User.user_id'),nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('User.user_id'),nullable=False)
    message = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.DateTime(timezone=True), index=True, nullable=False)
    unread = db.Column(db.Boolean, default = True)

    def __init__(self, sender_id, receiver_id, message, timestamp):
        self.sender_id = sender_id
        self.receiver_id = receiver_id
        self.message = message
        self.timestamp = timestamp

    
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result


# class Notifications(db.Model):
#     __tablename__ = 'notifications'
#     id = db.Column(db.Integer, primary_key=True, auto_increment=True)
#     name = db.Column(db.String(128), index=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
#     timestamp = db.Column(db.DateTime(timezone=True), index=True, nullable=False)
#     payload_json = db.Column(db.Text)

#     def get_data(self):
#         return json.loads(str(self.payload_json))

"""
Filters all the None objects from a list
"""


def filt_None(obj):
    if obj != None:
        return True
    else:
        return False


"""
Assuming that the create-react-app/frontend is giving me the user_name and password.
If the values match, we return a json with the id of the user and their location(i.e the latitude
and longitude attached with the user)
If the values don't match, we return an empty json
"""


@app.route('/api/login', methods=['POST'])
def login():
    email = request.form['email']
    pwd = request.form['password']
    print(email)
    user = list(User.query.filter_by(email=email))
    if (len(user) < 1):
        return jsonify(error="No User by this email"), status.HTTP_406_NOT_ACCEPTABLE

    user = user[0]
    print(user)
    if user is None or not user.check_password(pwd):
        return jsonify(error="Credentials dont match"), status.HTTP_401_UNAUTHORIZED
    else:
        login_user(user)
        return jsonify(user=user.get_id(),
                       latitude=user.latitude, longitude=user.longitude, name=user.user_name), status.HTTP_202_ACCEPTED


"""
SignUp route. It will take the person's details and store it in the database.
Assumptions made: That latitude and longitude will be form submissions.(Would it be possible
for you to automatically update two fields on the form called latitude and longitude using
the Google API).
It reroutes to login.
Should it return some json? Should we directly reroute it to home page?
"""
@app.route('/api/signup', methods=['POST'])
def signup():
    user_name = request.form['user_name']
    password = request.form['password']
    email = request.form['email']
    latitude = request.form['latitude']
    longitude = request.form['longitude']
    user = User(user_name=user_name, email=email,
                latitude=latitude, longitude=longitude)
    user.set_password(password)

    try:
        db.session.add(user)
        db.session.commit()
        # return redirect('/login')
        # return jsonify(success="Signed up successfully.")
        # resp = Response(json.dumps(js), status=201,
        # mimetype='application/json')
        return jsonify(success="Signed up successfully."), status.HTTP_201_CREATED
    except Exception as e:
        if str(e)[0:61] == "(sqlite3.IntegrityError) UNIQUE constraint failed: User.email":
            return jsonify(error="There is already a user for that email id."), status.HTTP_401_UNAUTHORIZED
        else:
            print(str(e)[0:61])
            return jsonify(error=str(e)), status.HTTP_401_UNAUTHORIZED
        resp = Response(json.dumps(js), status=401,
                        mimetype='application/json')
        return resp


"""
Logsout an user from an existing session.
"""
@app.route('/api/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify(success="Logged out successfully."), status.HTTP_200_OK


"""
This was the index file inititally.
I believe, we need to change the app route as this isn't the base app route(it could be?)
I am not sure how we'll get data because after login, I am passing the user_id, latitude and longitude
as a json. When the frontend now sends the data, it needs to send the user_id assosciated with that logging session
for database additions.
Everything else is pretty much the same.

"""
@app.route('/', methods=['GET'])
# @login_required #this decorator prevents us from accessing this app route if we dont have a user logged in.
def help():
    return app.send_static_file('index.html')


@app.route('/api/request/add', methods=["POST"])
def helpeeFunction():
    task_content = request.form['content']
    """if the method is POST for storing the id of the user, then use the line below"""
    helpee_id = request.form['helpee_id']
    """
        if the method is GET, remove the above if statement and use the lines below.
        Change the values of name_help, phone_help etc depending of what you are returning
        I didn't make phone_help a compulsory field. Can always change that
        """
    task_short_content = request.form['short_content']

    new_task = Todo(content=task_content, helpee_id=helpee_id,
                    short_content=task_short_content)

    try:
        db.session.add(new_task)
        db.session.commit()
        return jsonify(success="Added request successfuly."), status.HTTP_201_CREATED
    except Exception as e:
        return jsonify(error=str(e)), status.HTTP_406_NOT_ACCEPTABLE


"""
The same as app route ('/'). I don't know how we'll store the user_id because it will be required
here too.
I am adding something for the time being
"""
@app.route('/api/request/accept/<int:id>', methods=['POST'])
def helper(id):
    task = Todo.query.get_or_404(id)
    task.helper_id = request.form['helper_id']
    try:
        db.session.commit()
        return jsonify(success="Accepted request successfuly."), status.HTTP_202_ACCEPTED
    except:
        return jsonify(error="there was an issue in accepting"), status.HTTP_406_NOT_ACCEPTABLE


@app.route('/api/requests/all', methods=['GET'])
def getAllRequests():
    temp = list(Todo.query.all())
    reqs = list(map(lambda x: x._asdict(), temp))
    return jsonify(requests=reqs), status.HTTP_201_CREATED

# for debugging
@app.route('/api/users/all', methods=['GET', 'POST'])
def getAllUsers():
    temp = list(User.query.filter_by(email="i@gmail.com"))
    print(temp)
    reqs = list(map(lambda x: x.email, temp))
    # print(temp)
    reqs = reqs[0]
    return jsonify(requests=reqs), status.HTTP_201_CREATED


@app.route('/api/user/<int:id>', methods=['GET', 'POST'])
def getUserDetails(id):
    user = User.query.get_or_404(id)
    return jsonify(name=user.user_name, latitude=user.latitude, longitude=user.longitude), status.HTTP_201_CREATED


"""
Returns the distance between two pairs of latitudes and longitudes in KM.
"""


def get_dist(obj, slong, slat, elong, elat):
    dist = 6371.01 * acos(sin(slat)*sin(elat) + cos(slat)
                          * cos(elat)*cos(slong - elong))
    return (obj, dist)


def get_dist_help(obj, elong, elat):
    print(obj.helpee_id)
    user = User.query.get_or_404(obj.helpee_id)
    latitude = user.latitude
    longitude = user.longitude
    return get_dist(obj, latitude, longitude, elong, elat)


"""
returns the json of the objects sorted by ascending order of closest distance
Again, I don't know how the user_id will be stored and passed along to different webpages.
As the User class is now storing latitude and longitude, the way of getting it changes
but everything else should stay the same.
"""
@app.route('/api/requests/<int:id>', methods=['GET', 'POST'])
def closest_points(id):
    # id = request.args.get('id')
    user = User.query.get_or_404(id)
    lat_helper = user.latitude
    long_helper = user.longitude
    lst_objects = list(Todo.query.all())
    # print(lst_objects[0].)
    fin_vals = sorted(list(map(lambda x: get_dist_help(
        x, long_helper, lat_helper), lst_objects)), key=itemgetter(1))
    n_lst = [x[0] for x in fin_vals]
    reqs = list(map(lambda x: x._asdict(), n_lst))
    return jsonify(requests=reqs)


"""
Commenting delete and update for now as it will change later

@app.route('/delete/<int:id>',  methods=['POST', 'GET'])
def delete(id):
    task_to_delete = Todo.query.get_or_404(id)

    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'


@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
    task = Todo.query.get_or_404(id)

    if request.method == 'POST':
        task.content = request.form['content']

        try:
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue updating your task'

    else:
        return render_template('update.html', task=task)

"""


"""Sending a message, I don't know how we're getting the sender information but the idea in my
head us that when you're logged in you can click on a request you've accepted and hit a button that says
chat, and that takes you to the chat_msg window where it displays that conversation's history  """

"""Note: this is checking sender and receiver id not name, 
I need to make it take in the receiver name in the frontend and pass it in here. It should work like this
if I can get Chat.jsx incorporated as a Panel in HelperForm.jsx. Helpee id gets passed in as the reciever"""
"""But there also needs to be another chat window that shows all notifications for a helpee which is where Chat.jsx
will come into play."""

@login_required
@app.route('/api/send_message/', methods=['POST'])
def send_message():
    sender = request.form['sender']
    receiver = request.form['receiver']
    message = request.form['chat']
    new_msg = Chat(sender_id = sender, receiver_id = receiver,message = message, timestamp= datetime.now())
    try:
        db.session.add(new_msg)
        # receiver.add_notification('unread_msg', receiver.msg_notifications())
        db.session.commit()
        return jsonify(success="message was sent"), status.HTTP_201_CREATED
    except Exception as e:
        return jsonify(error=str(e)), status.HTTP_406_NOT_ACCEPTABLE

'''returns the users in contact with a particular user'''
@app.route('/api/allusers/<int:id>')
@login_required
def messages(id):
    user = User.query.get_or_404(id)
    user.last_seen = datetime.utcnow()
    # user.add_notification('unread_message_count', 0)
    try:
        db.session.commit()
        sender = aliased(User)
        receiver = aliased(User)
        users = session.query(Chat.sender_id.label("send_id"), sender.name.label("sender"), Chat.receiver_id.label("rec_id"), receiver.name.label("receiver"), Chat.message.label("message"), Chat.timestamp.label("timestamp"))
        users = users.outerjoin(sender, Chat.sender_id == sender.user_id)
        users = users.outerjoin(sender, Chat.receiver_id == receiver.user_id)
        users = users.filter(or_(Chat.sender_id == id, Chat.receiver_id == id))
        users = users.order_by(Chat.timestamp.desc())
        final_list = []
        for user in users:
            final_list.append(user.sender if user.send_id != id else user.receiver)
        return json.dumps(final_list)
        
        # return jsonify([{'sender_id': i.sender_id, 'receiver_id': i.receiver.id, 'message': i.message, 'timestamp':i.timestamp, 'unread':i.unread} for i in messages]), status.HTTP_202_ACCEPTED
    except Exception as e:
        return jsonify(error=str(e)), status.HTTP_406_NOT_ACCEPTABLE

'''returns the messages between two particular people and marks them all as read for the current user'''
@app.route('/api/currmessages/<int:id>')
@login_required
def mark_read(id):
    sender = request.form['sender']
    user = User.query.get_or_404(id)
    messages = Chat.query.filter(or_(and_(\
        Chat.sender_id==id, Chat.receiver_id == sender), and_(Chat.sender_id==sender, Chat.receiver_id == id))\
        ).order_by(Chat.timestamp.desc())
    messages.unread = False
    try:
        db.session.commit()
        return jsonify([{'sender_id': i.sender_id, 'receiver_id': i.receiver.id, \
        'message': i.message, 'timestamp':i.timestamp, 'unread':i.unread} for i in messages]), status.HTTP_202_ACCEPTED
    except Exception as e:
        return jsonify(error=str(e)), status.HTTP_406_NOT_ACCEPTABLE

# @app.route('/notifications/<int:id>')
# @login_required
# def notifications(id):
#     user = User.query.get_or_404(id)
#     new_msgs_from = request.args.get('last_update', 0.0, type=float)
#     new_notifs = user.notifications.filter(Notifications.timestamp > last_update).order_by(Notification.timestamp.asc())
#     return jsonify([{'name': n.name,'data': n.get_data(),'timestamp': n.timestamp} for n in new_notifs])





if __name__ == "__main__":
    app.run(debug=True)
