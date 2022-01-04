from flask import Blueprint, request, redirect, jsonify
from sqlalchemy.orm import session
from app import db
from models import ListofMessagesAdmin
MessageAdmin = Blueprint('MessageAdmin',__name__)

@MessageAdmin.route('/messageSenderFromAdminToAll',methods=['GET','POST'])
def messageSenderFromAdminToAll(): #sends message from admin to all users
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        new_message = ListofMessagesAdmin(title = title, description = description)
        db.session.add(new_message)
        db.session.commit()
        return redirect('http://localhost:3000/adminpage')


@MessageAdmin.route('/messageDeleterAdmin',methods=['GET','POST'])
def messageDeleterAdmin():
    if request.method == 'POST': #used to delete certain message
        id = request.form['id']
        message = ListofMessagesAdmin.query.filter_by(id = id).first()
        db.session.delete(message)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

@MessageAdmin.route('/getMessageAdmin',methods=['GET','POST'])
def getMessageAdmin(): #returns all messages in the db as a json 
    if request.method == 'GET':
        Messages = ListofMessagesAdmin.query.all()
        return jsonify(Messages)

