from flask import Blueprint, request, redirect, jsonify
from app import db
from models import ListofMessages
Message = Blueprint('Message',__name__)

@Message.route('/messageSender',methods=['GET','POST'])
def messageSender():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        new_message = ListofMessages(title=title, description=description)
        db.session.add(new_message)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

@Message.route('/messageDeleter',methods=['GET','POST'])
def messageDeleter():
    if request.method == 'POST':
        id = request.form['id']
        message = ListofMessages.query.filter_by(id=id).first()
        db.session.delete(message)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

@Message.route('/getMessage',methods=['GET','POST'])
def getMessage():
    if request.method == 'GET':
        Messages = ListofMessages.query.all()
        return jsonify(Messages)