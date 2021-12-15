from flask import Flask, request, redirect, session, jsonify
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.weather import weather_data
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

from models import User,ListOfLists,ListOfPlaces

@app.route('/register', methods = ['GET', 'POST'])
def Register():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        new_user = User(username=username, password=password) #user table constructor
        db.session.add(new_user)
        db.session.commit()
        return redirect('http://localhost:3000/')

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

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    if request.method == 'POST':
        session.pop('user_id', None)
        return redirect('http://localhost:3000/')

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
        lists = ListOfLists.query.filter_by(user_id=user_id).all()
        return jsonify(lists)
        
@app.route('/removelist', methods=['GET','POST'])
def removelist():
    if request.method == 'POST':
        user_id = session.get("user_id")
        id = request.form['id']
        list = ListOfLists.query.filter_by(user_id = user_id,id=id).first()
        db.session.delete(list)
        db.session.commit()
        return redirect('http://localhost:3000/userPage')

@app.route('/addplace', methods=['GET','POST'])
def addplace():
    if request.method == 'POST':
        user_id = session.get("user_id")
        list_id = session.get("list_id")
        place_name = request.form['PlaceName']
        start_date = request.form['start_date']
        end_date = request.form['end_date']
        new_place = ListOfPlaces(user_id = user_id, list_id = list_id, name = place_name,start_date=start_date,end_date=end_date)
        db.session.add(new_place)
        db.session.commit()
        return redirect('http://localhost:3000/userpage/places')

@app.route('/removeplace', methods=['GET','POST'])
def removeplace():
    if request.method == 'POST':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        id = request.form['id']
        place = ListOfPlaces.query.filter_by(user_id=user_id,list_id=list_id,id=id).first()
        db.session.delete(place)
        db.session.commit()
        return redirect('http://localhost:3000/userPage/places')

@app.route('/getplaces', methods=['GET', 'POST'])
def getplaces():
    if request.method == 'GET':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        places = ListOfPlaces.query.filter_by(user_id=user_id,list_id=list_id).all()
        return jsonify(places)

@app.route('/viewlist', methods=['GET', 'POST'])
def viewlist():
    if request.method == 'POST':
        list_id = request.form['list_id']
        session['list_id'] = list_id
    return redirect('http://localhost:3000/UserPage/places')

if __name__ == '__main__':
    app.run()