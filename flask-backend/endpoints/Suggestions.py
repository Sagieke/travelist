from flask import Blueprint, request, redirect, jsonify
from app import db
from models import ListofSuggestions

suggestion = Blueprint('suggestion',__name__)

@suggestion.route('/submitSuggestion',methods=['GET','POST'])
def submitSuggestion():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        new_suggestions = ListofSuggestions( title=title, description=description)
        db.session.add(new_suggestions)
        db.session.commit()
        return redirect('http://localhost:3000/')

@suggestion.route('/deleteSuggestion',methods=['GET','POST'])
def deleteSuggestion():
    if request.method == 'POST':
        id = request.form['id']
        suggestion = ListofSuggestions.query.filter_by(id=id).first()
        db.session.delete(suggestion)
        db.session.commit()
        return redirect('http://127.0.0.1:5000/')

@suggestion.route('/getSuggestions',methods=['GET','POST'])
def getSuggestions():
    if request.method == 'GET':
        bugs = ListofSuggestions.query.all()
        return jsonify(bugs)