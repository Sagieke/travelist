from app import  db
from models import ListofMessages
from werkzeug.security import generate_password_hash
from test_Homepage import MyTest

class UserListTest(MyTest):
    def test_add_Message_db(self):
        message = ListofMessages(title = 'testitle', description = 'testdescription')
        db.session.add(message)
        db.session.commit() 
        assert message in db.session

    def test_add_Message(self):
        tester = self.app.test_client(self)  
        response = tester.post('/messageSender', data={'title': 'test', 'description': 'test'})
        self.assertRedirects(response, 'http://127.0.0.1:5000/')