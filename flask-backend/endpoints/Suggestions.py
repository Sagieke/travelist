from flask import Blueprint, request, redirect, jsonify
from app import db
from models import Suggestion

Suggestion = Blueprint('Suggestion',__name__)

@Suggestion.route('/submitSuggestion',methods=['GET','POST'])
def submitSuggestion():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        status = 'Pending'
        new_suggestions = Suggestion(title=title, description=description, status = status)
        db.session.add(new_suggestions)
        db.session.commit()
        return redirect('http://localhost:3000/')

@Suggestion.route('/deleteSuggestion',methods=['GET','POST'])
def deleteSuggestion():
    if request.method == 'POST':
        id = request.form['id']
        Suggestion = Suggestion.query.filter_by(id=id).first()
        db.session.delete(Suggestion)
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')

@Suggestion.route('/ChangeSuggestionStatusTech',methods=['GET','POST'])
def ChangeSuggestionStatusTech():
    if request.method == 'POST':
        suggestion_id = request.form['id']
        Suggestion = Suggestion.query.filter_by(id = suggestion_id).first()
        if Suggestion.status == 'Pending':
            Suggestion.status = 'In Treatment'
        else: 
            Suggestion.status = 'Pending'
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')

@Suggestion.route('/ChangeSuggestionStatusAdmin',methods=['GET','POST'])
def ChangeSuggestionStatusAdmin():
    if request.method == 'POST':
        suggestion_id = request.form['id']
        Suggestion = Suggestion.query.filter_by(id = suggestion_id).first()
        if Suggestion.status == 'In Treatment':
            Suggestion.status = 'Treated'
        else: 
            Suggestion.status = 'In Treatment'
        db.session.commit()
        return redirect('http://localhost:3000/adminpage')

@Suggestion.route('/getSuggestionsTech',methods=['GET','POST'])
def getSuggestionsTech():
    if request.method == 'GET':
        bugs = Suggestion.query.filter_by(status = 'Pending').all()
        return jsonify(bugs)

@Suggestion.route('/getSuggestionsAdmin',methods=['GET','POST'])
def getSuggestionsAdmin():
    if request.method == 'GET':
        bugs = Suggestion.query.filter_by(status = 'In Treatment').all()
        return jsonify(bugs)
