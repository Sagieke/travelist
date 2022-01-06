from flask import Blueprint, request, redirect, jsonify,session
from app import db
from models import TechSupportMessage,User
MessageTech = Blueprint('MessageTech',__name__)

@MessageTech.route('/messageSenderToTechFromUser',methods=['GET','POST'])
def messageSenderToTechFromUser(): #send a message to tech support
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        user_id = session.get("user_id")
        new_message = TechSupportMessage(traveler_id=user_id,title=title, description=description,answer = '',status = 'Pending')
        db.session.add(new_message)
        db.session.commit()
        return redirect('http://localhost:3000/userPage')
    else : redirect('http://localhost:3000/pagenotfound')

#Requirement 103
@MessageTech.route('/messageSenderFromTechToUser',methods=['GET','POST'])
def messageSenderFromTechToUser(): #send answer to users question
    if request.method == 'POST':
        id = request.form['id'] 
        answer = request.form['answer']
        tech_id = session.get("user_id")
        message = TechSupportMessage.query.filter_by(id=id).first()
        message.answer = answer
        message.status = 'Answered'
        message.tech_id = tech_id
        tech = User.query.filter_by(id=tech_id).first()
        tech.answers += 1
        db.session.commit()
        return redirect('http://localhost:3000/techsupport/')
    else : redirect('http://localhost:3000/pagenotfound')

@MessageTech.route('/messageDeleterTech',methods=['GET','POST'])
def messageDeleterTech():
    if request.method == 'POST': #delete a message
        id = request.form['id']
        message = TechSupportMessage.query.filter_by(id=id).first()
        db.session.delete(message)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')
    else : redirect('http://localhost:3000/pagenotfound')

@MessageTech.route('/getAllMessageTech',methods=['GET','POST'])
def getAllMessageTech(): #returns all the messages in the db as json file
    if request.method == 'GET':
        Messages = TechSupportMessage.query.all()
        return jsonify(Messages)
    else : redirect('http://localhost:3000/pagenotfound')

@MessageTech.route('/getMessageTech',methods=['GET','POST'])
def getMessageUserToTech():
    if request.method == 'GET': #returns a message of choosing as a json file
        user_id = session.get("user_id")
        Message = TechSupportMessage.query.filter_by(traveler_id=user_id).all()
        return jsonify(Message)
    else : redirect('http://localhost:3000/pagenotfound')

#Requirement 110
@MessageTech.route('/RateTechSupport',methods=['GET','POST'])
def RateTechSupport():
    if request.method == 'POST':
        tech_id = request.form['tech_id']
        rating = request.form['rating']
        id = request.form['id']
        user = User.query.filter_by(id = tech_id).first()
        message =  TechSupportMessage.query.filter_by(id=id).first()
        message.status = 'Treated'
        user.rating += float(rating)/user.answers
        db.session.commit()
        return redirect('http://localhost:3000/userpage')
    else : redirect('http://localhost:3000/pagenotfound')

@MessageTech.route('/GetTechSupportRating',methods=['GET','POST'])
def GetTechSupportRating():
    if request.method == 'GET':
        tech_id = session.get("user_id")
        tech = User.query.filter_by(id = tech_id).first()
        rating = tech.rating
        return jsonify(rating)
    else : redirect('http://localhost:3000/pagenotfound')