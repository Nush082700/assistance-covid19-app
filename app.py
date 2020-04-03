from sqlalchemy.inspection import inspect
from flask import Flask, render_template, url_for, request, redirect, jsonify, Response, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from collections import OrderedDict
import os
from flask_migrate import Migrate
from math import radians, cos, sin, asin, sqrt

class DictSerializable(object):
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            if type(getattr(self,key)) == str:
                result[key] = lower(getattr(self, key))
            else:
                result[key] = getattr(self, key)
        return result


app = Flask(__name__, static_url_path='',
            static_folder='frontend/build')
CORS(app)
# DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
# app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://yvsdbbygynanhv:4621ee9546238883d5abdd451d7a7b6f579e4f8242ca2aa57c8bee4110cc95c7@ec2-54-157-78-113.compute-1.amazonaws.com:5432/d20701ijn8dq6g'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://fzmmhnvdwnhyas:78082b19b58ea424aaddcfa7bc2d87b59610bf9826d2aee0779abb8dac22369a@ec2-18-235-97-230.compute-1.amazonaws.com:5432/d7r9sk576t8up'
# # app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/test'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# migrate = Migrate(app, db)
# print(db.Model)


class Todo(db.Model):
    # __tablename__ = 'assistance'

    id = db.Column(db.Integer, primary_key=True)
    name_help = db.Column(db.String(), default = "t")
    address_help_line1 = db.Column(db.String(), default = "t")
    address_help_line2 = db.Column(db.String(), default = "t")
    address_help_sector = db.Column(db.String(), default = "t")
    address_help_city = db.Column(db.String(), default = "t")
    address_help_state = db.Column(db.String(), default = "t")
    address_help_country = db.Column(db.String(), default = "t")
    address_help_pincode = db.Column(db.Integer, default = 0)
    phone_help = db.Column(db.BigInteger, default = 0)
    content = db.Column(db.String(), default = "t")
    name_helper = db.Column(db.String(), default = "t")
    address_helper_line1 = db.Column(db.String(), default = "t")
    address_helper_line2 = db.Column(db.String(), default = "t")
    address_help_sector = db.Column(db.String(), default = "t")
    address_helper_city = db.Column(db.String(), default = "t")
    address_helper_state = db.Column(db.String(), default = "t")
    address_helper_country = db.Column(db.String(), default = "t")
    address_helper_pincode = db.Column(db.Integer, default = 0)
    phone_helper = db.Column(db.BigInteger, default = 0)
    

    def __init__(self, name_help, phone_help, content, date_created, name_helper, phone_helper,
    address_help_line1, address_help_line2, address_help_sector, address_help_city, address_help_state, address_help_country, address_help_pincode,
    address_helper_line1, address_helper_line2, address_helper_sector, address_helper_city, address_helper_state, address_helper_country, address_helper_pincode):
        self.name_help = name_help
        self.phone_help = phone_help
        self.content = content
        self.date_created = date_created
        self.name_helper = name_helper
        self.phone_helper = phone_helper
        self.address_help_line1 = address_help_line1
        self.address_help_line2 = address_help_line2
        self.address_help_sector = address_help_sector
        self.address_help_city = address_help_city
        self.address_help_state = address_help_state
        self.address_help_country = address_help_country
        self.address_help_pincode = address_help_pincode
        self.address_helper_line1 = address_helper_line1
        self.address_helper_line2 = address_helper_line2
        self.address_helper_sector = address_helper_sector
        self.address_helper_city = address_helper_city
        self.address_helper_state = address_helper_state
        self.address_helper_country = address_helper_country
        self.address_helper_pincode = address_helper_pincode
        
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
        name_helpee = request.form['name_help']
        address_helpee_line1 = request.form['address_help_line1']
        address_helpee_line2 = request.form['address_help_line2']
        address_help_sector = request.form ['address_help_sector']
        address_help_city = request.form['address_help_city']
        address_help_state = request.form['address_help_state']
        address_help_country = request.form['address_help_country']
        address_help_pincode = request.form ['address_help_pincode']
        phone_helpee = request.form['phone_help']
        task_content = request.form['content']
        new_task = Todo(name_help=name_helpee, content=task_content, phone_help=phone_helpee,
        address_helpee_line1=address_helpe_line1, address_helpee_line2=address_helpe_line2, 
        address_help_sector=address_help_sector,address_help_city=address_help_city,address_help_state=address_help_state,
        address_help_country=address_help_country,address_help_pincode=address_help_pincode,
        address_helper_line1="", address_helper_line="", address_helper_sector="", address_helper_city="",address_helper_state="",
        address_helper_country="",address_helper_pincode="",
                        name_helper="", phone_helper=0, )

        try:
            print("Adding to the database")
            db.session.add(new_task)
            print("committing to the database")
            db.session.commit()
            return redirect('/')
        except Exception as e:
            return(str(e))

    else:
        return app.send_static_file('index.html')


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
        task.address_helper_line1 = request.form['address_helper_line1']
        task.address_helper_line2 = request.form['address_helper_line2']
        task.address_helper_sector = request.form['address_helper_sector']
        task.address_helper_city = request.form['address_helper_city']
        task.address_helper_state = request.form['address_helper_state']
        task.address_helper_country = request.form['address_helper_country']
        task.address_helper_pincode = request.form['address_helper_pincode']
        task.phone_helper = request.form['phone_helper']

        try:
            db.session.commit()
            return redirect('/')
        except:
            return "there was an issue in accepting"
    else:
        return render_template('helper.html', task=task)


@app.route('/requests/all', methods=['GET', 'POST'])
def getAllRequests():
    temp = list(Todo.query.all())
    reqs = list(map(lambda x: x._asdict(), temp))
    return jsonify(requests=reqs)

"""
I have created a more detailed address set for which we need to be very specific on what
should be entered. The prompts should be as such:
Line 1 -> House Number / Flat + Tower Number
Line 2 -> Street / Society
Sector -> Sector / county
city, state, country -> self explanatory
"""
@app.route('/area/<string:line2>', methods=['GET', 'POST'])
def getPincode(line2):
    if Todo.query.filter_by(address_help_line2=line2).count() > 0:
        logs = list(Todo.query.filter_by(address_help_line2=line2))
        reqs = list(map(lambda x: x._asdict(), logs))
        return jsonify(requests=reqs)
    else:
        return jsonify(requests=[])


if __name__ == "__main__":
    app.run()
