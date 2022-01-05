from app import  db
from models import TechSupportMessage,User
from test_Homepage import MyTest
from werkzeug.security import generate_password_hash

class UserListTest(MyTest):
    def test_add_Message_Tech_db(self):
        message = TechSupportMessage(title = 'testitleTech', description = 'testdescription',answer = 'answer')
        db.session.add(message)
        db.session.commit() 
        assert message in db.session

    def test_delete_Message_Tech_db(self):
        message = TechSupportMessage(title = 'testitleATech', description = 'testdescription',answer = 'answer')
        db.session.add(message)
        db.session.commit() 
        message = TechSupportMessage.query.filter_by(id=1).first()
        db.session.delete(message)
        db.session.commit()
        assert message not in db.session

    def test_message_Sender_To_Tech_From_User(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/login', data={'email': 'username', 'password': 'password'})
        response = tester.post('/messageSenderToTechFromUser', data={'title': 'test', 'description': 'test'})
        self.assertRedirects(response, 'http://127.0.0.1:5000/')

    def test_message_Deleter_Tech(self):
        new_message = TechSupportMessage(title = 'testitleATech', description = 'testdescription',answer = 'answer')
        db.session.add(new_message)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/messageDeleterTech', data={'id': '1'})
        self.assertRedirects(response, 'http://127.0.0.1:5000/')