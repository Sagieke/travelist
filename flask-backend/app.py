from flask import Flask, request, redirect,render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS
from flask_socketio import SocketIO

#flask app initialization
app = Flask(__name__)

#flask app configuration
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SECRET_KEY"] = "changeme"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config["SESSION_TYPE"] = "filesystem"
app.config['SESSION_PERMANENT'] = True

#additional functionality initialization
db = SQLAlchemy(app) #database
Session(app) #cookies
socketio = SocketIO(app) #sockets
CORS(app,supports_credentials=True) #Cross-Origin Resource Sharing

#blueprints initialization
from endpoints.Chat import chat_blueprint
from endpoints.Homepage import Homepage
from endpoints.ListOfListsPage import ListOfListsPage
from endpoints.ListofPlacesPage import ListOfPlacesPage
from endpoints.Message import Message
from endpoints.Userlist import Userlist
app.register_blueprint(chat_blueprint)
app.register_blueprint(Homepage)
app.register_blueprint(ListOfListsPage)
app.register_blueprint(ListOfPlacesPage)
app.register_blueprint(Message)
app.register_blueprint(Userlist)

@app.route('/')
def server():
    return "<h1>Hello, this is the server, nothing of interest here :)</h1>"


#new blueprints testings
from models import ListofBugs,ListofSuggestions

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
