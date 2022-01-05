from app import  db
from models import User, List
from werkzeug.security import generate_password_hash
from test_Homepage import MyTest

class UserPageTest(MyTest):
    def test_change_password(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/login', data={'email': 'username', 'password': 'password'})
        response = tester.post('/changepassword', data={'user_id': '1', 'new_password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_addlist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        response = tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_removelist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        response = tester.post('/removelist', data={'user_id': '1', 'list_id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_viewlist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        response = tester.post('/viewlist', data={'list_id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/userPage/places')

    def test_getlists(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "traveler", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/login', data={'email': 'username', 'password': 'password'})
        list = List(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        test = [{'color' : '#ffffff','id' : 1,'name' : 'testlist','user_id' : 1}]
        response = tester.get('/getlists', data={'user_id': '1'})
        self.assertEquals(response.json,test)