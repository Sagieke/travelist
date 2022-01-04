from flask import Blueprint, request, redirect, jsonify,session
from app import db
from models import ListofMessagesTech
MessageTech = Blueprint('MessageTech',__name__)

@MessageTech.route('/messageSenderToTechFromUser',methods=['GET','POST'])
def messageSenderToTechFromUser(): #send a message to tech support
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        user_id = session.get("user_id")
        new_message = ListofMessagesTech(user_id=user_id,title=title, description=description,answer = '',status = 'Pending')
        db.session.add(new_message)
        db.session.commit()
        return redirect('http://localhost:3000/userPage')

@MessageTech.route('/messageSenderFromTechToUser',methods=['GET','POST'])
def messageSenderFromTechToUser(): #send answer to users question
    if request.method == 'POST':
        id = request.form['id'] 
        answer = request.form['answer']
        message = ListofMessagesTech.query.filter_by(id=id).first()
        message.answer = answer
        message.status = 'Treated'
        db.session.commit()
        return redirect('http://localhost:3000/techsupport/')

@MessageTech.route('/messageDeleterTech',methods=['GET','POST'])
def messageDeleterTech():
    if request.method == 'POST': #delete a message
        id = request.form['id']
        message = ListofMessagesTech.query.filter_by(id=id).first()
        db.session.delete(message)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

@MessageTech.route('/getAllMessageTech',methods=['GET','POST'])
def getAllMessageTech(): #returns all the messages in the db as json file
    if request.method == 'GET':
        Messages = ListofMessagesTech.query.all()
        return jsonify(Messages)

@MessageTech.route('/getMessageTech',methods=['GET','POST'])
def getMessageUserToTech():
    if request.method == 'GET': #returns a message of choosing as a json file
        user_id = session.get("user_id")
        Message = ListofMessagesTech.query.filter_by(user_id=user_id).all()
        return jsonify(Message)