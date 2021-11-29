from app import db
from dataclasses import dataclass

class User(db.Model): #user data base
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True, nullable = False)
    password = db.Column(db.String(100), nullable = False)

@dataclass
class ListOfLists(db.Model):
    #serialize using dataclass from dataclasses
    name: str
    color: str

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    color = db.Column(db.String(7), nullable = False)

db.create_all()