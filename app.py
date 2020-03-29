from sqlalchemy.inspection import inspect
from flask import Flask, render_template, url_for, request, redirect, jsonify, Response, json
from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
from flask_cors import CORS
from collections import OrderedDict
import os
from flask_migrate import Migrate
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
# app.logger.addHandler(logging.StreamHandler(sys.stdout))
# app.logger.setLevel(logging.ERROR)
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
migrate = Migrate(app,db)
# print(db.Model)


class Todo(db.Model):
    __tablename__ = 'assistance'

    id = db.Column(db.Integer, primary_key=True)
    name_help = db.Column(db.String(1000), nullable=False)
    address_help = db.Column(db.String(1000), nullable=False)
    phone_help = db.Column(db.Integer(20))
    content = db.Column(db.String(1000), nullable=False)
    date_created = db.Column(db.Integer)
    name_helper = db.Column(db.String(1000), nullable=False)
    address_helper = db.Column(db.String(1000), nullable=False)
    phone_helper = db.Column(db.Integer(20))
    pincode = db.Column(db.Integer)

    def __init__(self, name_help, address_help, phone_help, content, date_created, name_helper, address_helper, phone_helper, pincode):
        self.name_help = name_help
        self.phone_help = phone_help
        self.content = content
        self.date_created = date_created
        self.name_helper = name_helper
        self.address_helper = address_helper
        self.phone_helper = phone_helper
        self.pincode = pincode
                                                
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            result[key] = getattr(self, key)
        return result

    def serialize(self):
        return {
            'id':self.id,
            'name_help':self.name_help,
            'address_help':self.address_help,
            'phone_help':self.phone_help,
            'content':self.content,
            'date_created':self.sate_created,
            'name_helper':self.name_helper,
            'address_helper':self.address_helper,
            'phone_helper':self.phone_helper,
            'pincode':self.pincode
        }
    def __repr__(self):
        return '<Task %r>' % self.id


@app.route('/', methods=['POST', 'GET'])
def help():
    # return app.send_static_file('index.html')
    if request.method == 'POST':
        print(request.form['name_help'])
        name_helpee = request.form['name_help']
        print(request.form['address_help'])
        address_helpee = request.form['address_help']
        print(request.form['phone_help'])
        phone_helpee = request.form['phone_help']
        print(request.form['content'])
        task_content = request.form['content']
        # pincode_helpee = request.form['pincode']
        new_task = Todo(name_help=name_helpee, content=task_content,
                        address_help=address_helpee, phone_help=phone_helpee,
                        name_helper="", address_helper="", phone_helper="",pincode = "", date_created = "")

        try:
            print("Adding to the database")
            db.session.add(new_task)
            print("committing to the database")
            db.session.commit()
            return redirect('/')
        except Exception as e:
            # return 'There was an issue adding your task'
            return(str(e))
    # elif request.method == 'GET':
    #     reqs = Todo.query.all()
    #     results = [
    #         {
    #             "name_help" = req.name_help,
    #             "content" = req.content,
    #             "address_help" = req.address_help,
    #             "phone_help" = req.phone_help,
    #             "name_helper" = req.name_helper,
    #             "address_helper" = req.address_helper,
    #             "phone_helper" = req.phone_helper,
    #             "pincode" = req.pincode
    #         } for req in reqs]
    #     ]
    #     return {"count:"len(reqs), "logs":results}

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
    # try:
    #     reqs = Todo.query.all()
    #     return jsonify([r.serialize() for r in reqs])
    # except Exception as e:
	#     return(str(e))
    # return jsonify(requests=list(Todo.query.order_by(Todo.date_created).all()))
    # temp = list(Todo.query.order_by(Todo.date_created).all())
    temp = list(Todo.query.all())
    reqs = list(map(lambda x: x._asdict(), temp))
    # print(type(reqs))
    return jsonify(requests=reqs)


if __name__ == "__main__":
    app.run()
