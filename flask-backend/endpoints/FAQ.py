from flask import Blueprint, session, request, redirect, jsonify
from app import db
from models import FAQ
FAQ = Blueprint('FAQ',__name__)

@FAQ.route('/addFAQ', methods=['GET', 'POST'])
def addFAQ():
    if request.method == 'POST':
        question = request.form('question')
        answer = request.form('answer')
        faq = FAQ(question = question, answer = answer)
        db.session.add(faq)
        db.session.commit() 
        return redirect('http://localhost:3000/faqUpdate')

@FAQ.route('/deleteFAQ', methods=['GET', 'POST'])
def deleteFAQ():
    if request.method == 'POST':
        id = request.form('id')
        faq = FAQ.query.filter_by(id = id).first()
        db.session.delete(faq)
        db.session.commit() 
        return redirect('http://localhost:3000/faqUpdate')

@FAQ.route('/updateFAQ', methods=['GET', 'POST'])
def updateFAQ():
    if request.method == 'POST':
        faq = FAQ.query.filter_by(id = id).first()
        question = request.form('question')
        answer = request.form('answer')
        faq.question = question
        faq.answer = answer
        db.session.commit() 
        return redirect('http://localhost:3000/faqUpdate')