from flask_testing import TestCase
from app import create_app, db
from models import User
from werkzeug.security import generate_password_hash

class MyTest(TestCase):
    def create_app(self):
        app = create_app(True,'sqlite://')
        return app

    def tearDown(self):
        db.session.remove()
        db.drop_all()

class HomepageTest(MyTest):

    def test_db_add_user(self):
        user = User(username="username", password="password", usertype = "usertype", answer = "answer", question = 'question')
        db.session.add(user)
        db.session.commit()
        assert user in db.session

    def test_Register(self):
        tester = self.app.test_client(self)  
        response = tester.post('/register', data={'email': 'username', 'password': 'password', 'question' : 'question','answer':'answer'})
        self.assertRedirects(response, 'http://localhost:3000/')
    
    def test_Login_traveler(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "Traveler", answer = "answer", question = 'test')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')
    
    def test_Login_techsupport(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "TechSupport", answer = "answer", question = 'test')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/techSupport')

    def test_Login_admin(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "Admin", answer = "answer", question = 'test')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/adminPage')

    def test_forgotPasswordValidation(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/forgotPasswordValidation', data={ 'email': 'username','question' : 'question','answer': 'answer'})
        self.assertRedirects(response, 'http://127.0.0.1:5000/test3')
    
    def test_forgotPasswordChange(self):
        password = generate_password_hash("password")
        user = User(username="username", password = password, usertype = "usertype", answer = "answer", question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/forgotPasswordValidation', data={ 'email': 'username','question' : 'question','answer': 'answer'})
        response = tester.post('/forgotPasswordChange', data={'password': 'newpassword', 'confirm' : 'newpassword'})
        self.assertRedirects(response, 'http://localhost:3000/')
