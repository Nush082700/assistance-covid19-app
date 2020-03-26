from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_help = db.Column(db.String(200), nullable=False)
    address_help = db.Column(db.String(1000), nullable=False)
    phone_help = db.Column(db.Integer)
    content = db.Column(db.String(1000), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    name_helper = db.Column(db.String(200), nullable=False)
    address_helper = db.Column(db.String(1000), nullable=False)
    phone_helper = db.Column(db.Integer)

    def __repr__(self):
        return '<Task %r>' % self.id


@app.route('/', methods=['POST', 'GET'])
def help():
    if request.method == 'POST':
        name_helpee = request.form['name_helpee']
        address_helpee = request.form['address_helpee']
        phone_helpee = request.form['phone_helpee']
        task_content = request.form['content']
        new_task = Todo(name_help=name_helpee, content=task_content,
                        address_help=address_helpee, phone_help=phone_helpee,
                        name_helper="", address_helper="", phone_helper="")

        try:
            db.session.add(new_task)
            db.session.commit()
            return redirect('/')
        except:
            return 'There was an issue adding your task'

    else:
        tasks = Todo.query.order_by(Todo.date_created).all()
        return render_template('index.html', tasks=tasks)


@app.route('/delete/<int:id>')
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


if __name__ == "__main__":
    app.run(debug = True)