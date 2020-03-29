from sqlalchemy.inspection import inspect
from flask import Flask, render_template, url_for, request, redirect, jsonify, Response, json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from collections import OrderedDict
import os
# def get_env_variable(name):
#     try:
#         return os.environ[name]
#     except KeyError:
#         message = "Expected environment variable '{}' not set.".format(name)
#         raise Exception(message)

# # the values of those depend on your setup
# POSTGRES_URL = get_env_variable("POSTGRES_URL")
# POSTGRES_USER = get_env_variable("POSTGRES_USER")
# POSTGRES_PW = get_env_variable("POSTGRES_PW")
# POSTGRES_DB = get_env_variable("POSTGRES_DB")


class DictSerializable(object):
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result


app = Flask(__name__, static_url_path='',
            static_folder='frontend/build')
# static_url_path='/static',
# static_folder='/frontend/build')
CORS(app)
# DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
# app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://fzmmhnvdwnhyas:78082b19b58ea424aaddcfa7bc2d87b59610bf9826d2aee0779abb8dac22369a@ec2-18-235-97-230.compute-1.amazonaws.com:5432/d7r9sk576t8up'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/test'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# print(db.Model)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_help = db.Column(db.String(), nullable=False)
    address_help = db.Column(db.String(), nullable=False)
    phone_help = db.Column(db.Integer)
    content = db.Column(db.String(), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    name_helper = db.Column(db.String(), nullable=False)
    address_helper = db.Column(db.String(), nullable=False)
    phone_helper = db.Column(db.Integer)
    pincode = db.Column(db.Integer)

    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result

    def __repr__(self):
        return '<Task %r>' % self.id


@app.route('/', methods=['POST', 'GET'])
def help():
    # return app.send_static_file('index.html')
    if request.method == 'POST':
        # print(request.form['name_help'])
        name_helpee = request.form['name_help']
        address_helpee = request.form['address_help']
        phone_helpee = request.form['phone_help']
        task_content = request.form['content']
        pincode_helpee = request.form['pincode']
        new_task = Todo(name_help=name_helpee, content=task_content,
                        address_help=address_helpee, phone_help=phone_helpee,
                        name_helper="", address_helper="", phone_helper="",pincode = "")

        try:
            db.session.add(new_task)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding your task'

    else:
        # tasks = Todo.query.order_by(Todo.date_created).all()
        # return app .send_static_file('index.html')
        return app.send_static_file('index.html')

# @app.route('/helpee', methods = ['POST','GET'])
# def helpee():
#     name_helpee = request.form['name_helpee']
#         address_helpee = request.form['address_helpee']
#         phone_helpee = request.form['phone_helpee']
#         task_content = request.form['content']
#         pincode_helpee = request.form['pincode']
#         new_task = Todo(name_help=name_helpee, content=task_content,
#                         address_help=address_helpee, phone_help=phone_helpee,
#                         name_helper="", address_helper="", phone_helper="",pincode = "")

#         try:
#             db.session.add(new_task)
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue adding your task'


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


@app.route('/helper/<int:id>', methods=['GET', 'POST'])
def helper(id):
    task = Todo.query.get_or_404(id)

    if request.method == 'POST':
        task.name_helper = request.form['name_helper']
        task.address_helper = request.form['address_helper']
        task.phone_helper = request.form['phone_helper']

        try:
            db.session.commit()
            return redirect('/')
        except:
            return "there was an issue in accepting"
    else:
        return render_template('helper.html', task=task)


@app.route('/requests/all', methods=['GET','POST'])
def getAllRequests():
    # return jsonify(requests=list(Todo.query.order_by(Todo.date_created).all()))
    temp = list(Todo.query.order_by(Todo.date_created).all())
    reqs = list(map(lambda x: x._asdict(), temp))
    # print(type(reqs))
    return jsonify(requests=reqs)


if __name__ == "__main__":
    app.run()
