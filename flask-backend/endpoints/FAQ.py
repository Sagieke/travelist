from flask import Blueprint, request, redirect, jsonify
from app import db
from models import FAQ
faq = Blueprint('faq',__name__)

@faq.route('/addFAQ', methods=['GET', 'POST'])
def addFAQ(): #adds new FAQ to the site
    if request.method == 'POST':
        question = request.form['question']
        answer = request.form['answer']
        faq = FAQ(question = question, answer = answer)
        db.session.add(faq)
        db.session.commit() 
        return redirect('http://localhost:3000/techSupport')
    else : redirect('http://localhost:3000/pagenotfound')
    

@faq.route('/deleteFAQ', methods=['GET', 'POST'])
def deleteFAQ(): #deletes an FAQ from the site
    if request.method == 'POST':
        id = request.form['id']
        faq = FAQ.query.filter_by(id = id).first()
        db.session.delete(faq)
        db.session.commit() 
        return redirect('http://localhost:3000/techSupport')
    else : redirect('http://localhost:3000/pagenotfound')

@faq.route('/updateFAQ', methods=['GET', 'POST'])
def updateFAQ(): #updates existing FAQ
    if request.method == 'POST':
        id = request.form['id']
        print(id)
        faq = FAQ.query.filter_by(id = id).first()
        question = request.form['question']
        print(question)
        answer = request.form['answer']
        print(answer)
        faq.question = question
        faq.answer = answer
        db.session.commit() 
        return redirect('http://localhost:3000/adminpage')
    else : redirect('http://localhost:3000/pagenotfound')

@faq.route('/getFAQ',methods=['GET','POST'])
def getFAQ():
    if request.method == 'GET':
        FAQs = FAQ.query.all()
        return jsonify(FAQs)
    else : redirect('http://localhost:3000/pagenotfound')