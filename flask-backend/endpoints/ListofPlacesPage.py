from re import split
from flask import Blueprint, json, session, request, redirect, jsonify
from app import db
from models import ListOfPlaces, ListOfLists
import requests

ListOfPlacesPage = Blueprint('ListOfPlacesPage',__name__)

@ListOfPlacesPage.route('/addplace', methods=['GET','POST'])
def addplace():
    if request.method == 'POST':
        user_id = session.get("user_id")
        list_id = session.get("list_id")
        place_name = request.form['place_name']
        start_date = request.form['start_date']
        end_date = request.form['end_date']
        lat_lon_dict = get_lat_lon(place_name)
        lat = lat_lon_dict["lat"]
        lon = lat_lon_dict["lon"]
        new_place = ListOfPlaces(user_id = user_id, list_id = list_id, name = place_name,start_date=start_date,end_date=end_date, lat = lat, lon = lon)
        db.session.add(new_place)
        db.session.commit()
        return redirect('http://localhost:3000/userpage/places')

@ListOfPlacesPage.route('/removeplace', methods=['GET','POST'])
def removeplace():
    if request.method == 'POST':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        id = request.form['place_id']
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

@ListOfPlacesPage.route('/viewplace', methods=['GET','POST'])
def viewPlace():
    if request.method == 'POST':
        place_id = request.form['place_id']
        session['place_id'] = place_id
    return redirect('http://localhost:3000/UserPage/places/place')

@ListOfPlacesPage.route('/getListInfo', methods=['GET','POST'])
def getListInfo():
    if request.method == 'GET':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        list_info = ListOfLists.query.filter_by(user_id=user_id,id=list_id).first()
    return jsonify(list_info)

def get_lat_lon(name):
    lat_lon_dict = {}
    name = name.split(", ")[0]
    api_key = '5d50cb77a4d850371ce5a430e31c9b24'
    api_url = "http://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid={}".format(name, api_key)
    data = requests.get(api_url)
    data = data.json()
    lat_lon_dict.update({"lat": data["coord"]["lat"]})
    lat_lon_dict.update({"lon": data["coord"]["lon"]})
    return lat_lon_dict