from app import db
from dataclasses import dataclass


class User(db.Model): #user data base
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True, nullable = False)
    password = db.Column(db.String(100), nullable = False)

@dataclass
class ListOfLists(db.Model):
    __tablename__ = 'listoflists'
    user_id: int
    id: int
    name: str
    color: str

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    color = db.Column(db.String(7), nullable = False)

@dataclass
class ListOfPlaces(db.Model):
    user_id: int
    list_id: int
    list_name: str
    id: int
    name: str
    start_date: str
    end_date: str

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('listoflists.id'))
    list_name = db.Column(db.String(100), db.ForeignKey('listoflists.name'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    start_date = db.Column(db.String(8), nullable = False)
    end_date = db.Column(db.String(8), nullable = False)

db.create_all()