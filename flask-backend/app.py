from flask import Flask, request, redirect, session, jsonify
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from api.weather import weather_data
app = Flask(__name__)

app.register_blueprint(weather_data)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['SECRET_KEY'] = 'R4gP2Bq2Oc#`*@d'
Session(app)
db = SQLAlchemy(app)

@app.route('/')
def server():
    return "<h1>Hello, this is the server, nothing of interest here :)</h1>"

from models import User,ListOfLists

@app.route('/register', methods = ['GET', 'POST'])
def Register():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return redirect('http://localhost:3000/mainpage') #redirecting to login page  

@app.route('/login', methods=['GET', 'POST'])
def Login():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(username = username).first()
        if user and user.password == password:
            session['user_id'] = user.id
            session['username'] = username
            return redirect('http://localhost:3000/userPage')

@app.route('/logout')
def logout():
    # remove the username from the session if it's there
    session.pop('username', None)
    return redirect('http://localhost:3000/mainpage')

@app.route('/addlist', methods=['GET','POST'])
def addlist():
    if request.method == 'POST':
        user_id = session.get("user_id")
        list_name = request.form['ListName']
        color = request.form['color']
        new_list = ListOfLists(user_id = user_id,name = list_name,color=color)
        db.session.add(new_list)
        db.session.commit()
        return redirect('http://localhost:3000/userPage')

@app.route('/getlists', methods=['GET','POST'])
def getlists():
    if request.method == 'GET':
        data = {}
        user_id = session.get("user_id")
        lists = ListOfLists.query.filter_by(user_id = user_id).all()
        for list in lists:
            for list.id in list:
                list.id = {}
                data["name"] = list.name
                data["color"]= list.color
        return jsonify(data)


if __name__ == '__main__':
    app.run(debug = True)