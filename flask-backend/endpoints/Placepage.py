from flask import Blueprint, session, jsonify, request, redirect
from models import Place, Equipment
from app import db

PlacePage = Blueprint('PlacePage',__name__)
#requirement number 7
@PlacePage.route('/getEquipmentChecklist', methods=['GET', 'POST'])
def getEquipmentChecklist():
    if request.method == 'GET':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        place_id = session.get('place_id')
        equipment = Equipment.query.filter_by(user_id=user_id,list_id=list_id,place_id=place_id).all()
        return jsonify(equipment)

@PlacePage.route('/removeEquipment', methods=['GET','POST'])
def removeEquipment():
    if request.method == 'POST':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        place_id = session.get('place_id')
        id = request.form['id']
        equipment = Equipment.query.filter_by(user_id=user_id,list_id=list_id,place_id=place_id,id=id).first()
        db.session.delete(equipment)
        db.session.commit()
        return redirect('http://localhost:3000/userpage/places/place')

@PlacePage.route('/addEquipment', methods=['GET','POST'])
def addplace():
    if request.method == 'POST':
        user_id = session.get("user_id")
        list_id = session.get("list_id")
        place_id = session.get('place_id')
        equipment_name = request.form['equipment_name']
        color = "#808080"
        new_equipment = Equipment(user_id = user_id, list_id = list_id, place_id = place_id, name = equipment_name, color = color, checked = False)
        db.session.add(new_equipment)
        db.session.commit()
        return redirect('http://localhost:3000/userpage/places/place')

@PlacePage.route('/checkEquipment', methods=['GET','POST'])
def checkEquipment():
    if request.method == 'POST':
        user_id = session.get("user_id")
        list_id = session.get("list_id")
        place_id = session.get('place_id')
        equipment_id = request.form['id']
        equipment = Equipment.query.filter_by(user_id=user_id,list_id=list_id,place_id=place_id,id=equipment_id).first()
        if equipment.checked == False:
            equipment.checked = True
            equipment.color = "#97e189"
        else:
            equipment.checked = False
            equipment.color = "#808080"
        db.session.commit()
        return redirect('http://localhost:3000/UserPage/places/place')

@PlacePage.route('/getPlaceInfo', methods=['GET','POST'])
def getPlaceInfo():
    if request.method == 'GET':
        user_id = session.get('user_id')
        list_id = session.get('list_id')
        place_id = session.get('place_id')
        place_info = Place.query.filter_by(user_id=user_id,list_id=list_id,id=place_id).first()
    return jsonify(place_info)