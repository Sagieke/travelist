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

class UserListTest(MyTest):
    def test_change_permission_tech_TECH(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionTech', data={'role': 'TECH', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/techsupport')

    def test_change_permission_tech_TRAVELER(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionTech', data={'role': 'TRAVELER', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/techsupport')

    def test_change_permission_admin_ADMIN(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionAdmin', data={'role': 'ADMIN', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_change_permission_admin_TECH(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionAdmin', data={'role': 'TECH', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_change_permission_admin_TRAVELER(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionAdmin', data={'role': 'TRAVELER', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_delete_user(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/deleteUser', data={'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_delete_user_db(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer")
        db.session.add(user)
        db.session.commit()
        user = User.query.filter_by(id = 1).first()
        db.session.delete(user)
        db.session.commit()
        assert user not in db.session