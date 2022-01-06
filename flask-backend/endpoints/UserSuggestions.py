from flask import Blueprint, request, redirect, jsonify
from app import db
from models import Suggestion

UserSuggestions = Blueprint('Suggestion',__name__)

@UserSuggestions.route('/submitSuggestion',methods=['GET','POST'])
def submitSuggestion():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        status = 'Pending'
        new_suggestion = Suggestion(title=title, description=description, status = status)
        db.session.add(new_suggestion)
        db.session.commit()
        return redirect('http://localhost:3000/userpage')
    else : redirect('http://localhost:3000/pagenotfound')

@UserSuggestions.route('/deleteSuggestion',methods=['GET','POST'])
def deleteSuggestion():
    if request.method == 'POST':
        id = request.form['id']
        suggestion = Suggestion.query.filter_by(id=id).first()
        db.session.delete(suggestion)
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')

@UserSuggestions.route('/ChangeSuggestionStatusTech',methods=['GET','POST'])
def ChangeSuggestionStatusTech():
    if request.method == 'POST':
        suggestion_id = request.form['id']
        suggestion = Suggestion.query.filter_by(id = suggestion_id).first()
        if suggestion.status == 'Pending':
            suggestion.status = 'In Treatment'
        else: 
            suggestion.status = 'Pending'
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')

@UserSuggestions.route('/ChangeSuggestionStatusAdmin',methods=['GET','POST'])
def ChangeSuggestionStatusAdmin():
    if request.method == 'POST':
        suggestion_id = request.form['id']
        suggestion = Suggestion.query.filter_by(id = suggestion_id).first()
        if suggestion.status == 'In Treatment':
            suggestion.status = 'Treated'
        else: 
            suggestion.status = 'In Treatment'
        db.session.commit()
        return redirect('http://localhost:3000/adminpage')

@UserSuggestions.route('/getSuggestionsTech',methods=['GET','POST'])
def getSuggestionsTech():
    if request.method == 'GET':
        suggestions = Suggestion.query.filter_by(status = 'Pending').all()
        return jsonify(suggestions)

@UserSuggestions.route('/getSuggestionsAdmin',methods=['GET','POST'])
def getSuggestionsAdmin():
    if request.method == 'GET':
        suggestions = Suggestion.query.filter_by(status = 'In Treatment').all()
        return jsonify(suggestions)
