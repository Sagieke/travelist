from enum import unique
from flask_login.mixins import UserMixin
from flask_wtf.form import FlaskForm
from app import db
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError

class User(db.Model,UserMixin): #user data base
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True, nullable = False)
    password = db.Column(db.String(80), nullable = False)

class ListOfPlaceList(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    color = db.Column(db.String(7), nullable = False)

class RegisterForm(FlaskForm): #registry form
    username = StringField(validators = [InputRequired(),Length(min = 0, max=100)], 
    render_kw={"placeholder":"Email"})
    password = PasswordField(validators=[InputRequired(), Length(min = 4, max = 20)],
    render_kw={"placeholder": "Password"})
    submit = SubmitField("Register")

    def validate_user(self,username): #throw error if entered email already exists in DB
        existing_user_username = User.query.filterby(username = username.data).first()
        if existing_user_username:
            raise ValidationError("A username with this email already exists. Please login or use another email")

class LoginForm(FlaskForm): #login form
    username = StringField(validators = [InputRequired(),Length(min = 0, max=100)], 
    render_kw={"placeholder":"Email"})
    password = PasswordField(validators=[InputRequired(), Length(min = 4, max = 20)],
    render_kw={"placeholder": "Password"})
    submit = SubmitField("Login")


db.create_all()