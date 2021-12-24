from flask import Blueprint, request, jsonify, redirect
from app import db
from models import User

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
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
        if role == 'TRAVELER':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Traveler'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
    else : return redirect('http://127.0.0.1:5000/')
    
@Userlist.route('/changePermissionAdmin',methods=['GET','POST']) 
def changePermissionAdmin():
    if request.method == 'POST':
        role = request.form['role']
        user_id = request.form['id']
        if role == 'TECH' :
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'TechSupport'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
        if role == 'ADMIN':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Admin'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
        if role == 'TRAVELER':
            user = User.query.filter_by(id = user_id).first()
            user.usertype = 'Traveler'
            db.session.commit()
            return redirect('http://127.0.0.1:5000/test')
    else : return redirect('http://127.0.0.1:5000/')

@Userlist.route('/deleteUser',methods=['GET','POST'])
def deleteUser():
    if request.method == 'POST':
        user_id = request.form['id']
        user = User.query.filter_by(id = user_id).first()
        db.session.delete(user)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/test')