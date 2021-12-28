from app import db
from models import User,ListOfLists
from werkzeug.security import generate_password_hash
from test_Homepage import MyTest
from flask import jsonify

class LsitofListTest(MyTest):
    def test_addlist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        response = tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_removelist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        response = tester.post('/removelist', data={'user_id': '1', 'list_id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_viewlist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        response = tester.post('/viewlist', data={'list_id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/UserPage/places')

    def test_getlists(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "traveler", answer = "answer")
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/login', data={'email': 'username', 'password': 'password'})
        list = ListOfLists(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        response = tester.get('/getlists', data={'user_id': '1'})
        self.assertEquals(response.json,dict(list))

