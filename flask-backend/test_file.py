from flask_testing import TestCase
from app import create_app, db
from models import User
from werkzeug.security import generate_password_hash, check_password_hash

class MyTest(TestCase):
    def create_app(self):
        app = create_app(True,'sqlite://')
        return app

    def tearDown(self):
        db.session.remove()
        db.drop_all()

class HomepageTest(MyTest):

    def test_db_add_user(self):
        user = User(username="username", password="password", usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        assert user in db.session

    def test_Register(self):
        tester = self.app.test_client(self)  
        response = tester.post('/register', data={'email': 'username', 'password': 'password', 'answer':'answer'})
        self.assertRedirects(response, 'http://localhost:3000/')
    
    def test_Login_traveler(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')
    
    def test_Login_techsupport(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "techsupport", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_Login_admin(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    