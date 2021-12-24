from flask import Blueprint, session, request, redirect
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