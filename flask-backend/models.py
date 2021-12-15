from enum import unique
from app import db
from dataclasses import dataclass


class User(db.Model): #user data base
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True, nullable = False)
    password = db.Column(db.String(100), nullable = False)
    usertype = db.Column(db.String(100),unique = False, nullable = False)

class Chat(db.Model):
    chat_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key = True)

@dataclass
class ListOfLists(db.Model):
    user_id: int
    id: int
    name: str
    color: str

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    color = db.Column(db.String(7), nullable = False)

db.create_all()