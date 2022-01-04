from flask import Flask, request, redirect,render_template,jsonify, request,current_app
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS
from flask_socketio import SocketIO

db = SQLAlchemy() #database

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

    with app.app_context():
        #blueprints initialization
        from endpoints.Homepage import Homepage
        from endpoints.UserPage import UserPage
        from endpoints.ListPage import ListPage
        from endpoints.PlacePage import PlacePage
        from endpoints.MessagesAdmin import MessageAdmin
        from endpoints.MessagesTech import MessageTech
        from endpoints.Userlist import Userlist
        from endpoints.FAQ import faq
        from endpoints.BugReports import bug
        from endpoints.Suggestions import Suggestion
        from endpoints.JobPage import JobPage
        app.register_blueprint(Homepage)
        app.register_blueprint(UserPage)
        app.register_blueprint(ListPage)
        app.register_blueprint(PlacePage)
        app.register_blueprint(MessageAdmin)
        app.register_blueprint(MessageTech)
        app.register_blueprint(Userlist)
        app.register_blueprint(faq)
        app.register_blueprint(bug)
        app.register_blueprint(Suggestion)
        app.register_blueprint(JobPage)
        #database creation using models
        db.create_all()

        return app

app = create_app(False,'sqlite:///database.db')

@app.route('/',methods=['GET','POST'])
def server():
    return "<h1>Hello, this is the server, nothing of interest here :)</h1>"

if __name__ == '__main__':
   app.run()