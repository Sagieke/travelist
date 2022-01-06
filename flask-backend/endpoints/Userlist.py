from flask import Blueprint, request, jsonify, redirect,session
from app import db
from models import User,NumberofUsers

Userlist = Blueprint('Userlist',__name__)

@Userlist.route('/getUserlist',methods=['GET','POST'])
def getUserlist():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify(users)
    else : redirect('http://localhost:3000/pagenotfound')

#Requirement number 101
@Userlist.route('/changePermissionTech',methods=['GET','POST']) 
def changePermissionTech():
    if request.method == 'POST':
        role = request.form['role']
        user_id = request.form['id']
        if role == 'TECH' :
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'TechSupport'
            user.answers = 0
            user.rating = 0
            db.session.commit()
            return redirect('http://localhost:3000/techsupport')
        if role == 'TRAVELER':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Traveler'
            db.session.commit()
            return redirect('http://localhost:3000/techsupport')
    else : return redirect('http://localhost:3000/techsupport')

#Requirement number 1
@Userlist.route('/changePermissionAdmin',methods=['GET','POST']) 
def changePermissionAdmin():
    if request.method == 'POST':
        role = request.form['role']
        user_id = request.form['id']
        if role == 'TECH' :
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'TechSupport'
            user.answers = 0
            user.rating = 0
            db.session.commit()
            return redirect('http://localhost:3000/adminpage')
        if role == 'ADMIN':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Admin'
            db.session.commit()
            return redirect('http://localhost:3000/adminpage')
        if role == 'TRAVELER':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Traveler'
            db.session.commit()
            return redirect('http://localhost:3000/adminpage')
    else : return redirect('http://localhost:3000/blabla')

@Userlist.route('/deleteUser',methods=['GET','POST'])
def deleteUser():
    if request.method == 'POST':
        user_id = request.form['id']
        user = User.query.filter_by(id = user_id).first()
        num = NumberofUsers.query.filter_by(id = 1).first()
        num.number_of_users -= 1
        db.session.delete(user)
        db.session.commit()
        return redirect('http://localhost:3000/adminpage')
    else : redirect('http://localhost:3000/pagenotfound')

#Requirement 108
@Userlist.route('/reportUser',methods=['GET','POST'])
def reportUser():
    if request.method == 'POST':
        user_id = request.form['id']
        user = User.query.filter_by(id = user_id).first()
        if user.reported == False:
            user.reported = True
        elif user.reported == True:
            user.reported = False
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')

@Userlist.route('/getCertainUserlist',methods=['GET','POST'])
def getCertainUserlist():
    if request.method == 'GET':
        user_type = session.get("user_type")
        return jsonify(user_type)
    else : redirect('http://localhost:3000/pagenotfound')


