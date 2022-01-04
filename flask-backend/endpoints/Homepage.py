from os import name
from flask import Blueprint, session, request, redirect, json
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from models import User

Homepage = Blueprint('Homepage',__name__)

@Homepage.route('/register', methods = ['GET', 'POST'])
def Register():
    if request.method == 'POST':
        users = User.query.all()
        email = request.form['email']
        password = request.form['password']
        question = request.form['question']
        answer = request.form['answer']
        hashed_password = generate_password_hash(password)
        usertype = 'Traveler'
        new_user = User(username=email, password=hashed_password, usertype = usertype, answer = answer,question = question) #user table constructor
        for user in users:
            if new_user.username == user.username:
                return redirect('http://localhost:3000/signuperror')
        db.session.add(new_user)
        db.session.commit()
        return redirect('http://localhost:3000/')
        

@Homepage.route('/login', methods=['GET', 'POST'])
def Login():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(username = username).first()
        if user and check_password_hash(user.password,password):
            #save user to session
            session['user_id'] = user.id
            if user.usertype == 'Admin':
                return redirect('http://localhost:3000/adminPage')
            elif user.usertype == 'TechSupport':
                return redirect('http://localhost:3000/techSupport')
            else: 
                return redirect('http://localhost:3000/userPage')
        return redirect('http://localhost:3000/loginerror')
        
            
@Homepage.route('/logout', methods=['GET', 'POST'])
def logout():
    if request.method == 'POST':
        session.pop('user_id', None)
        return redirect('http://localhost:3000/')

@Homepage.route('/forgotPasswordValidation', methods=['GET', 'POST']) #Security question page 
def forgotPasswordValidation():
    if request.method == 'POST':
        id =session.get("user_id")
        session['user_id'] = id
        question = request.form['question']
        answer = request.form['answer']
        email = request.form['email']
        user = User.query.filter_by(username = email,answer = answer).first()
        if user :
            return redirect('http://127.0.0.1:5000/test3')
        else : return redirect('http://localhost:3000/')

@Homepage.route('/forgotPasswordChange', methods=['GET', 'POST']) #Password change page
def forgotPasswordChange():
    if request.method == 'POST':
        id =session.get("user_id")
        user = User.query.filter_by(id = id).first()
        password = request.form['password']
        confirm = password = request.form['confirm']
        if password == confirm :
            hashed_password = generate_password_hash(password)
            user.password = hashed_password
            db.session.commit()
            return redirect('http://localhost:3000/')
