from flask import Blueprint, session, request, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from models import User,NumberofUsers

Homepage = Blueprint('Homepage',__name__)

#requirement number 1
@Homepage.route('/register', methods = ['GET', 'POST'])
def Register():
    if request.method == 'POST':
        users = User.query.all()
        email = request.form['email']
        password = request.form['password']
        question = request.form['question']
        answer = request.form['answer']
        usertype = 'Traveler'
        new_user = User(username=email,
                        password=generate_password_hash(password),
                        usertype = usertype,
                        answer = answer,
                        question = question,
                        rating = 0,
                        answers=0,
                        reported = False)
        for user in users:
            if new_user.username == user.username:
                return redirect('http://localhost:3000/signuperror')
        num = NumberofUsers.query.filter_by(id = 1).first()
        num.number_of_users += 1
        db.session.add(new_user)
        db.session.commit()
        return redirect('http://localhost:3000/')
    else : redirect('http://localhost:3000/pagenotfound')
        
#requirement number 2 + 102 + 202
@Homepage.route('/login', methods=['GET', 'POST'])
def Login():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        user = User.query.filter_by(username = username).first()
        if user and check_password_hash(user.password,password):
            #save user to session
            session['user_id'] = user.id
            session['user_type'] = user.usertype
            if user.usertype == 'Admin':
                return redirect('http://localhost:3000/adminPage')
            elif user.usertype == 'TechSupport':
                return redirect('http://localhost:3000/techSupport')
            else: 
                return redirect('http://localhost:3000/userPage')
        return redirect('http://localhost:3000/loginerror')
    else : redirect('http://localhost:3000/pagenotfound')
        
            
@Homepage.route('/logout', methods=['GET', 'POST'])
def logout():
    if request.method == 'POST':
        session.pop('user_id', None)
        return redirect('http://localhost:3000/')
    else : redirect('http://localhost:3000/pagenotfound')

#requirement number 9
@Homepage.route('/forgotPasswordValidation', methods=['GET', 'POST']) #Security question page 
def forgotPasswordValidation():
    if request.method == 'POST':
        question = request.form['question']
        answer = request.form['answer']
        email = request.form['email']
        user = User.query.filter_by(username = email, question= question, answer = answer).first()
        if user :
            session['user_id'] = user.id
            return redirect('http://localhost:3000/userpage')
    else : redirect('http://localhost:3000/pagenotfound')
       
#requirement number 9
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
            return redirect('http://localhost:3000/%27')
    else : redirect('http://localhost:3000/pagenotfound')