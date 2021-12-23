from app import db
from dataclasses import dataclass

class User(db.Model): #user data base
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True, nullable = False)
    password = db.Column(db.String(100), nullable = False)
    usertype = db.Column(db.String(100),unique = False, nullable = False)
    answer = db.Column(db.String(100),unique = False, nullable = False)

@dataclass
class ListOfLists(db.Model):
    __tablename__ = 'ListOfLists'
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
    __tablename__ = 'ListOfPlaces'
    user_id: int
    list_id: int
    id: int
    name: str
    start_date: str
    end_date: str

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('ListOfLists.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = False,nullable = False)
    start_date = db.Column(db.String(8), nullable = False)
    end_date = db.Column(db.String(8), nullable = False)

@dataclass
class ListOfAttractions(db.Model):
    __tablename__ = 'ListOfAttractions'
    user_id: int
    list_id: int
    place_id: int
    id: int
    name: str

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('ListOfLists.id'))
    place_id = db.Column(db.Integer, db.ForeignKey('ListOfPlaces.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = False,nullable = False)

class Chat(db.Model):
    chat_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key = True)

@dataclass
class ListofBugs(db.Model):
    __tablename__ = 'ListofBugs'
    id = db.Column(db.Integer, primary_key = True)
    #username = db.Column(db.String(100),unique = True, nullable = False)
    title = db.Column(db.String(50),unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)
    InTreatment = db.Column(db.Boolean, default=False,unique = False, nullable = False)

@dataclass
class ListofSuggestions(db.Model):
    __tablename__ = 'ListofSuggestions'
    id = db.Column(db.Integer, primary_key = True)
    #username = db.Column(db.String(100),unique = True, nullable = False)
    title = db.Column(db.String(50),unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)
    
db.create_all()