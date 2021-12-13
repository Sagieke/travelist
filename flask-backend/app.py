from flask import Flask, request, redirect, session, jsonify
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.weather import weather_data
import json
from flask_cors import CORS

#flask app initialization
app = Flask(__name__)
app.config["SECRET_KEY"] = "changeme"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config["SESSION_TYPE"] = "filesystem"
db = SQLAlchemy(app)
Session(app)
CORS(app,supports_credentials=True)

app.register_blueprint(weather_data)

@app.route('/')
def server():
    return "<h1>Hello, this is the server, nothing of interest here :)</h1>"

from models import User,ListOfLists

@app.route('/register', methods = ['GET', 'POST'])
def Register():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        new_user = User(username=username, password=password) #user table constructor
        db.session.add(new_user)
        db.session.commit()
        return redirect('http://localhost:3000/mainpage')

@app.route('/login', methods=['GET', 'POST'])
def Login():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(username = username).first()
        if user and user.password == password:
            #save user to session
            session['user_id'] = user.id
            return redirect('http://localhost:3000/userPage')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
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

@app.route('/getlists', methods=['GET', 'POST'])
def getlists():
    if request.method == 'GET':
        user_id = session.get('user_id')
        print("USER ID: {}".format(user_id))
        lists = ListOfLists.query.filter_by(user_id=user_id).all()
        return jsonify(lists)
        
@app.route('/removelist', methods=['GET','POST'])
def removelist():
    if request.method == 'POST':
        user_id = session.get("user_id")
        id = request.form['id2']
        lists = ListOfLists.query.filter_by(user_id = user_id,id=id).first()
        db.session.delete(lists)
        db.session.commit()
        return redirect('http://localhost:3000/userPage')
       
if __name__ == '__main__':
    app.run()