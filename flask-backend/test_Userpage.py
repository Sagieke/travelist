from flask_testing import TestCase
from app import create_app, db
from models import User
from werkzeug.security import generate_password_hash
from test_Homepage import MyTest

class UserListTest(MyTest):
    def test_Login_traveler(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/login', data={'email': 'username', 'password': 'password'})
        response = tester.post('/changepassword', data={'user_id': '1', 'new_password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/userpage')