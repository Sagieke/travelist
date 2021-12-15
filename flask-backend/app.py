from flask import Flask, request, redirect, session, jsonify,render_template, request, make_response,url_for
from flask_socketio import SocketIO, join_room
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from api.weather import weather_data


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

from models import User,ListOfLists

@app.route('/register', methods = ['GET', 'POST'])
def Register():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        usertype = 'traveler'
        new_user = User(username=username, password=password, usertype = usertype) #user table constructor
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
        print("USER ID: {}".format(user_id))
        lists = ListOfLists.query.filter_by(user_id=user_id).all()
        return jsonify(lists)
        
@app.route('/removelist', methods=['GET','POST'])
def removelist():
    if request.method == 'POST':
        user_id = session.get("user_id")
        id = request.form['id']
        lists = ListOfLists.query.filter_by(user_id = user_id,id=id).first()
        db.session.delete(lists)
        db.session.commit()
        return redirect('http://localhost:3000/userPage')




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

