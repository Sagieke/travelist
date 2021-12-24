from flask import Blueprint, session, request, redirect, jsonify
from app import db
from models import ListOfLists, ListOfPlaces

ListOfListsPage = Blueprint('ListOfListsPage',__name__)

@ListOfListsPage.route('/addlist', methods=['GET','POST'])
def addlist():
    if request.method == 'POST':
        user_id = session.get("user_id")
        list_name = request.form['list_name']
        color = request.form['color']
        new_list = ListOfLists(user_id = user_id,name = list_name,color=color)
        db.session.add(new_list)
        db.session.commit()
        return redirect('http://localhost:3000/userPage')

@ListOfListsPage.route('/getlists', methods=['GET', 'POST'])
def getlists():
    if request.method == 'GET':
        user_id = session.get('user_id')
        lists = ListOfLists.query.filter_by(user_id=user_id).all()
        return jsonify(lists)
        
@ListOfListsPage.route('/removelist', methods=['GET','POST'])
def removelist():
    if request.method == 'POST':
        user_id = session.get("user_id")
        list_id = request.form['list_id']
        list = ListOfLists.query.filter_by(user_id = user_id,id=list_id).first()
        places = ListOfPlaces.query.filter_by(list_id=list_id)
        if places:
            for row in places:
                db.session.delete(row)
                db.session.commit()
        db.session.delete(list)
        db.session.commit()
        return redirect('http://localhost:3000/userPage')

@ListOfListsPage.route('/viewlist', methods=['GET', 'POST'])
def viewlist():
    if request.method == 'POST':
        list_id = request.form['list_id']
        session['list_id'] = list_id
    return redirect('http://localhost:3000/UserPage/places')