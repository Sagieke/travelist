from flask import Flask, request, redirect,render_template,jsonify, request,current_app
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS
from flask_socketio import SocketIO

db = SQLAlchemy() #database
socketio = SocketIO() #sockets

#flask app initialization
def create_app(test_mode,db_uri):
    app = Flask(__name__)

    #flask app configuration
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config["SECRET_KEY"] = "changeme"
    app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config["SESSION_TYPE"] = "filesystem"
    app.config['SESSION_PERMANENT'] = True
    app.config['TESTING'] = test_mode

    #additional functionality initialization
    Session(app) #cookies
    db.init_app(app) #database
    CORS(app,supports_credentials=True) #Cross-Origin Resource Sharing
    socketio.init_app(app) #web sockets

    with app.app_context():
        #blueprints initialization
        from endpoints.Homepage import Homepage
        from endpoints.Userpage import Userpage
        from endpoints.ListOfListsPage import ListOfListsPage
        from endpoints.ListofPlacesPage import ListOfPlacesPage
        from endpoints.Chat import chat_blueprint
        from endpoints.Message import Message
        from endpoints.Userlist import Userlist
        from endpoints.Placepage import placepage
        from endpoints.FAQ import faq
        from endpoints.BugReports import bug
        from endpoints.Suggestions import suggestion
        app.register_blueprint(Homepage)
        app.register_blueprint(Userpage)
        app.register_blueprint(ListOfListsPage)
        app.register_blueprint(ListOfPlacesPage)
        app.register_blueprint(chat_blueprint)
        app.register_blueprint(Message)
        app.register_blueprint(Userlist)
        app.register_blueprint(placepage)
        app.register_blueprint(faq)
        app.register_blueprint(bug)
        app.register_blueprint(suggestion)
        #database creation using models
        db.create_all()

        return app

app = create_app(False,'sqlite:///database.db')

@app.route('/',methods=['GET','POST'])
def server():
    return "<h1>Hello, this is the server, nothing of interest here :)</h1>"

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
@app.route('/FAQ-test')
def FAQtest():
    return render_template("FAQ-test.html")

@app.route('/FAQ-delete')
def FAQdeletetest():
    return render_template("FAQ-delete.html")

@app.route('/FAQ-update')
def FAQupdatetest():
    return render_template("FAQ-update.html")
#end of test funcs


if __name__ == '__main__':
   app.run()