from flask import Blueprint, request, redirect, jsonify,session
from app import db
from models import ListofMessagesTech
MessageTech = Blueprint('MessageTech',__name__)

@MessageTech.route('/messageSenderTech',methods=['GET','POST'])
def messageSenderTech():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        user_id = session.get("user_id")
        new_message = ListofMessagesTech(user_id=user_id,title=title, description=description,answer = '')
        db.session.add(new_message)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

@MessageTech.route('/messageDeleterTech',methods=['GET','POST'])
def messageDeleterTech():
    if request.method == 'POST':
        id = request.form['id']
        message = ListofMessagesTech.query.filter_by(id=id).first()
        db.session.delete(message)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

@MessageTech.route('/getMessageTech',methods=['GET','POST'])
def getMessageTech():
    if request.method == 'GET':
        Messages = ListofMessagesTech.query.all()
        return jsonify(Messages)