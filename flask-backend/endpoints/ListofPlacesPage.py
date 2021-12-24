from flask import Blueprint, session, request, redirect, jsonify
from app import db
from models import ListOfPlaces

ListOfPlacesPage = Blueprint('ListOfPlacesPage',__name__)

@ListOfPlacesPage.route('/addplace', methods=['GET','POST'])
def addplace():
    if request.method == 'POST':
        user_id = session.get("user_id")
        list_id = session.get("list_id")
        place_name = request.form['PlaceName']
        start_date = request.form['start_date']
        end_date = request.form['end_date']
        new_place = ListOfPlaces(user_id = user_id, list_id = list_id, name = place_name,start_date=start_date,end_date=end_date)
        db.session.add(new_place)
        db.session.commit()
        return redirect('http://localhost:3000/userpage/places')

@ListOfPlacesPage.route('/removeplace', methods=['GET','POST'])
def removeplace():
    if request.method == 'POST':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        id = request.form['id']
        place = ListOfPlaces.query.filter_by(user_id=user_id,list_id=list_id,id=id).first()
        db.session.delete(place)
        db.session.commit()
        return redirect('http://localhost:3000/userPage/places')

@ListOfPlacesPage.route('/getplaces', methods=['GET', 'POST'])
def getplaces():
    if request.method == 'GET':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        places = ListOfPlaces.query.filter_by(user_id=user_id,list_id=list_id).all()
        return jsonify(places)

@ListOfPlacesPage.route('/getMostSearchedPlaces', methods=['GET','POST'])
def getMostSearchedPlaces():
    place_names = {}
    lst = []
    if request.method == 'GET':
        places = ListOfPlaces.query.all()
        for row in places:
            if row.name in place_names:
                place_names[row.name] = place_names[row.name] + 1
            else:
                place_names[row.name] = 1
        sorted_place_names = sorted(place_names,key=place_names.get,reverse=True)
        for x in range(5):
            lst.append(sorted_place_names[x])
        return jsonify(lst)

@ListOfPlacesPage.route('/viewplace', methods=['GET','POST'])
def viewPlace():
    if request.method == 'GET':
        place_id = request.form['id']
        session['place_id'] = place_id
    return redirect('http://localhost:3000/UserPage/places/place')