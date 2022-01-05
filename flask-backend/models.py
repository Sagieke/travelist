from app import db
from dataclasses import dataclass

#the dataclass decorator allows us to seralize database tables 
@dataclass
class User(db.Model): #user data base
    __tablename__ = 'User'
    id: int
    username: str
    usertype: str
    answer: str
    question: str
    rating: float
    answers: int 
    reported: bool

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True, nullable = False)
    password = db.Column(db.String(100), nullable = False)
    usertype = db.Column(db.String(100),unique = False, nullable = False)
    answer = db.Column(db.String(100),unique = False, nullable = False)
    question = db.Column(db.String(100),unique = False, nullable = False)
    rating = db.Column(db.Float, nullable = True)
    answers = db.Column(db.Integer, unique = False, nullable = True)
    reported = db.Column(db.Boolean,unique = False, nullable = False)

@dataclass
class List(db.Model): #List of lists of places
    __tablename__ = 'List'
    user_id: int
    id: int
    name: str
    color: str

    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    color = db.Column(db.String(7), nullable = False)

@dataclass
class Place(db.Model):
    __tablename__ = 'Place'
    user_id: int
    list_id: int
    id: int
    name: str
    start_date: str
    end_date: str
    lat: float
    lon: float

    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('List.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = False,nullable = False)
    start_date = db.Column(db.String(8), nullable = False)
    end_date = db.Column(db.String(8), nullable = False)
    lat = db.Column(db.Float, nullable = False)
    lon = db.Column(db.Float, nullable = False)

@dataclass
class Equipment(db.Model):
    __tablename__ = 'Equipment'
    user_id: int
    list_id: int
    place_id: int
    id: int
    name: str
    color: str
    checked: bool

    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    list_id = db.Column(db.Integer, db.ForeignKey('List.id'))
    place_id = db.Column(db.Integer, db.ForeignKey('Place.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), unique = False, nullable = False)
    color = db.Column(db.String(7), nullable = False)
    checked = db.Column(db.Boolean, nullable = False)

@dataclass
class BugReport(db.Model):
    __tablename__ = 'BugReport'
    id: int
    title: str
    description: str
    status: str
    statuscolor: str
    priority: str

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100),unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)
    status = db.Column(db.String(50), default=False,unique = False, nullable = False)
    statuscolor = db.Column(db.String(7), default=False,unique = False, nullable = False)
    priority = db.Column(db.String(50), default=False,unique = False, nullable = False)

@dataclass
class Suggestion(db.Model): #list of suggestions sent to the admin by the user
    __tablename__ = 'Suggestion'
    id: int
    title: str
    description: str
    status: str
    
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50),unique = False, nullable = False)
    status = db.Column(db.String(50), default=False,unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)

@dataclass
class AdminMessage(db.Model): #list of messages sent by the admin
    __tablename__ = 'AdminMessage'
    id: int
    title: str
    description: str

    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50),unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)
    
@dataclass
class TechSupportMessage(db.Model): #list of messages sent to tech support
    __tablename__ = 'TechSupportMessage'
    user_id: str
    id: int
    title: str
    description: str
    answer: str
    status: str

    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(50),unique = False, nullable = False)
    description = db.Column(db.String(300),unique = False, nullable = False)
    answer = db.Column(db.String(300),unique = False, nullable = False)
    status = db.Column(db.String(50), unique = False, nullable = False)

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