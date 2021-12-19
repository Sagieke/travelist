from os import name
from flask import Flask, request, redirect, session, jsonify,render_template, request, make_response,url_for
from flask_socketio import SocketIO, join_room
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.weather import weather_data
from werkzeug.security import generate_password_hash, check_password_hash

#flask app initialization
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SECRET_KEY"] = "changeme"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config["SESSION_TYPE"] = "filesystem"
db = SQLAlchemy(app)
Session(app)
socketio = SocketIO(app)
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
        hashed_password = generate_password_hash(password)
        usertype = 'traveler'
        new_user = User(username=username, password=hashed_password, usertype = usertype) #user table constructor
        db.session.add(new_user)
        db.session.commit()
        return redirect('http://localhost:3000/')

@app.route('/login', methods=['GET', 'POST'])
def Login():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(username = username).first()
        if user and check_password_hash(user.password,password):
            #save user to session
            session['user_id'] = user.id
            if user.usertype == 'admin':
                return redirect('http://localhost:3000/adminPage')
            elif user.usertype == 'techSupport':
                return redirect('http://localhost:3000/techSupportPage')
            else: 
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

@app.route('/getMostSearchedPlaces', methods=['GET','POST'])
def getMostSearchedPlaces():
    if request.method == 'GET':
        places = ListOfPlaces.query.column('name').all()
        print(places)
        return jsonify(places)
        

@app.route('/test')
def home():
    return render_template("index.html")

@app.route('/chat')
def chat():
    room = request.args.get('room')
    if room:
        return render_template('chat.html', room=room)
    else:
        return redirect(url_for('test'))

@socketio.on('join_room')
def handle_join_room_event(data):
    join_room(data['room'])
    socketio.emit('join_room_announcement', data)

@socketio.on('send_message')
def handle_send_message_event(data):
    socketio.emit('receive_message', data, room=data['room'])


if __name__ == '__main__':
    app.run()

