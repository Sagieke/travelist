from flask import Blueprint, request, jsonify, redirect
from app import db
from models import User,NumberofUsers

Userlist = Blueprint('Userlist',__name__)

@Userlist.route('/getUserlist',methods=['GET','POST'])
def getUserlist():
    if request.method == 'GET':
        users = User.query.all()
        return jsonify(users)

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

@Userlist.route('/RateTechSupport',methods=['GET','POST'])
def RateTechSupport():
    if request.method == 'POST':
        user_id = request.form['id']
        rating = request.form['rating']
        user = User.query.filter_by(id = user_id).first()
        user.rating += rating / user.answers
        db.session.commit()
        return redirect('https://www.youtube.com/watch?v=grd-K33tOSM')