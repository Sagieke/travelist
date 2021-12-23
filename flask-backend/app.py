from flask import Flask, request, redirect, session, jsonify,render_template, request, make_response,url_for
from flask_socketio import SocketIO, join_room
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy, model
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

from models import User,ListOfLists,ListOfPlaces,ListofBugs,ListofSuggestions

@app.route('/register', methods = ['GET', 'POST'])
def Register():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        answer = request.form['answer']
        hashed_password = generate_password_hash(password)
        usertype = 'traveler'
        new_user = User(username=username, password=hashed_password, usertype = usertype, answer = answer) #user table constructor
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
            
@app.route('/forgotPasswordButton', methods=['GET', 'POST']) #Forgot password button
def forgotPasswordButton():
    if request.method == 'POST':
        email = request.form['email']
        user = User.query.filter_by(username = email).first()
        session['user_id'] = user.id
        if user :
            return redirect('http://127.0.0.1:5000/test2')
        else : return redirect('http://localhost:3000/')

@app.route('/forgotPasswordValidation', methods=['GET', 'POST']) #Security question page 
def forgotPasswordValidation():
    if request.method == 'POST':
        id =session.get("user_id")
        session['user_id'] = id
        answer = request.form['answer']
        user = User.query.filter_by(id = id,answer = answer).first()
        if user :
            return redirect('http://127.0.0.1:5000/test3')
        else : return redirect('http://localhost:3000/')

@app.route('/forgotPasswordChange', methods=['GET', 'POST']) #Password change page
def forgotPasswordChange():
    if request.method == 'POST':
        id =session.get("user_id")
        user = User.query.filter_by(id = id).first()
        password = request.form['password']
        confirm = password = request.form['confirm']
        if password == confirm :
            hashed_password = generate_password_hash(password)
            user.password = hashed_password
            db.session.commit()
            return redirect('http://localhost:3000/')

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
    place_names = {}
    lst = []
    if request.method == 'GET':
        places = ListOfPlaces.query.all()
        for row in places:
            if row.name in place_names:
                place_names[row.name] = place_names[row.name] + 1
            else:
                place_names[row.name] = 1
        sorted_place_names = sorted(place_names,key=place_names.get,reverse=True)
        for x in range(5):
            lst.append(sorted_place_names[x])
        return jsonify(lst)

@app.route('/viewplace', methods=['GET','POST'])
def viewPlace():
    if request.method == 'GET':
        place_id = request.form['id']
        session['place_id'] = place_id
    return redirect('http://localhost:3000/UserPage/places/place')

@app.route('/getUserlist',methods=['GET','POST'])
def getUserlist():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify(users)

@app.route('/changePermissionTech',methods=['GET','POST']) 
def changePermissionTech():
    if request.method == 'POST':
        role = request.form['role']
        user_id = request.form['id']
        if role == 'TECH' :
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'TechSupport'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
        if role == 'TRAVELER':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Traveler'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
    else : return redirect('http://127.0.0.1:5000/')
    
@app.route('/changePermissionAdmin',methods=['GET','POST']) 
def changePermissionAdmin():
    if request.method == 'POST':
        role = request.form['role']
        user_id = request.form['id']
        if role == 'TECH' :
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'TechSupport'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
        if role == 'ADMIN':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Admin'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
        if role == 'TRAVELER':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Traveler'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
    else : return redirect('http://127.0.0.1:5000/')

@app.route('/deleteUser',methods=['GET','POST'])
def deleteUser():
    if request.method == 'POST':
        user_id = request.form['id']
        user = User.query.filter_by(id = user_id).first()
        db.session.delete(user)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/test')

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

@app.route('/submitBug',methods=['GET','POST'])
def submitBug():
    if request.method == 'POST':
        #user_name = session.get("username")
        title = request.form['title']
        description = request.form['description']
        new_report = ListofBugs(InTreatment = False, title=title, description=description)
        db.session.add(new_report)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

@app.route('/submitSuggestion',methods=['GET','POST'])
def submitSuggestion():
    if request.method == 'POST':
        #user_name = session.get("username")
        title = request.form['title']
        description = request.form['description']
        new_suggestions = ListofSuggestions( title=title, description=description)
        db.session.add(new_suggestions)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

#testing routes for backend

@app.route('/test')
def home():
    return render_template("testing.html")

@app.route('/test2')
def test():
    return render_template("testing-2.html")

@app.route('/test3')
def test2():
    return render_template("testing-3.html")

@app.route('/Report-test')
def bugtest():
    return render_template("Report-test.html")

@app.route('/Suggestions-test')
def Suggestiontest():
    return render_template("Suggestions-test.html")

#end of test funcs

if __name__ == '__main__':
    app.run()
