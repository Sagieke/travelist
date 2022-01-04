from typing import Text
from app import db
from dataclasses import dataclass

#the dataclass decorator allows us to seralize database tables 
@dataclass
class User(db.Model): #user data base
    __tablename__ = 'user'
    id: int
    username: str
    usertype: str
    answer: str
    question: str
    
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True, nullable = False)
    password = db.Column(db.String(100), nullable = False)
    usertype = db.Column(db.String(100),unique = False, nullable = False)
    answer = db.Column(db.String(100),unique = False, nullable = False)
    question = db.Column(db.String(100),unique = False, nullable = False)

@dataclass
class ListOfLists(db.Model): #List of lists of places
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
    lat: float
    lon: float

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('ListOfLists.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = False,nullable = False)
    start_date = db.Column(db.String(8), nullable = False)
    end_date = db.Column(db.String(8), nullable = False)
    lat = db.Column(db.Float, nullable = False)
    lon = db.Column(db.Float, nullable = False)

@dataclass
class BugReport(db.Model):
    __tablename__ = 'BugReport'
    id: int
    title: str
    description: str
    status: str
    statuscolor: str

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100),unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)
    status = db.Column(db.String(50), default=False,unique = False, nullable = False)
    statuscolor = db.Column(db.String(7), default=False,unique = False, nullable = False)

@dataclass
class ListofSuggestions(db.Model): #list of suggestions sent to the admin by the user
    __tablename__ = 'ListofSuggestions'
    id: int
    title: str
    description: str
    status: str
    
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50),unique = False, nullable = False)
    status = db.Column(db.String(50), default=False,unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)

@dataclass
class ListofMessagesAdmin(db.Model): #list of messages sent by the admin
    __tablename__ = 'ListofMessagesAdmin'
    id: int
    title: str
    description: str

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50),unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)
    

@dataclass
class ListofMessagesTech(db.Model): #list of messages sent to tech support
    __tablename__ = 'ListofMessagesTech'
    user_id: str
    id: int
    title: str
    description: str
    answer: str
    status: str

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50),unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)
    answer = db.Column(db.String(300),unique = False, nullable = False)
    status = db.Column(db.String(50), default=False,unique = False, nullable = False)


@dataclass
class FAQ(db.Model): 
    __tablename__ = 'FAQ'
    id: int
    question: str
    answer: str
    
    id = db.Column(db.Integer, primary_key = True)
    question = db.Column(db.String(150),unique = False, nullable = False)
    answer = db.Column(db.String(300),unique = False, nullable = False)

@dataclass
class EquipmentCheckList(db.Model):
    __tablename__ = 'EquipmentCheckList'
    user_id: int
    list_id: int
    place_id: int
    id: int
    name: str
    color: str
    checked: bool

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('ListOfLists.id'))
    place_id = db.Column(db.Integer, db.ForeignKey('ListOfPlaces.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = False, nullable = False)
    color = db.Column(db.String(7), nullable = False)
    checked = db.Column(db.Boolean, nullable = False)

@dataclass
class Job(db.Model):
    __tablename__ = 'Job'
    id: int
    title: str
    description: str
    requirements: str

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(150),unique = False, nullable = False)
    description = db.Column(db.Text,unique = False, nullable = False)
    requirements = db.Column(db.Text,unique = False, nullable = False)