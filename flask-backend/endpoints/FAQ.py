from flask import Blueprint, session, request, redirect, jsonify
from app import db
from models import FAQ
FAQ = Blueprint('FAQ',__name__)

@FAQ.route('\addFAQ', methods=['GET', 'POST'])
def addFAQ():
    if request.method == 'POST':
        question = request.form('question')
        answer = request.form('answer')
        faq = FAQ(question = question, answer = answer)
        db.session.add(faq)
        db.session.commit() 
        return redirect('http://localhost:3000/faqUpdate')