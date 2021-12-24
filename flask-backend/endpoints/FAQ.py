from flask import Blueprint, request, redirect
from app import db
from models import FAQ
faq = Blueprint('faq',__name__)

@faq.route('/addFAQ', methods=['GET', 'POST'])
def addFAQ():
    if request.method == 'POST':
        question = request.form('question')
        answer = request.form('answer')
        faq = FAQ(question = question, answer = answer)
        db.session.add(faq)
        db.session.commit() 
        return redirect('http://localhost:3000/faqUpdate')

@faq.route('/deleteFAQ', methods=['GET', 'POST'])
def deleteFAQ():
    if request.method == 'POST':
        id = request.form('id')
        faq = FAQ.query.filter_by(id = id).first()
        db.session.delete(faq)
        db.session.commit() 
        return redirect('http://localhost:3000/faqUpdate')

@faq.route('/updateFAQ', methods=['GET', 'POST'])
def updateFAQ():
    if request.method == 'POST':
        id = request.form('id')
        faq = FAQ.query.filter_by(id = id).first()
        question = request.form('question')
        answer = request.form('answer')
        faq.question = question
        faq.answer = answer
        db.session.commit() 
        return redirect('http://localhost:3000/faqUpdate')