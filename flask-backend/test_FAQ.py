from app import  db
from models import FAQ
from werkzeug.security import generate_password_hash
from test_Homepage import MyTest

class UserListTest(MyTest):
    def test_add_faq_db(self):
        faq = FAQ(question = 'testquestion', answer = 'testanswer')
        db.session.add(faq)
        db.session.commit() 
        assert faq in db.session

    def test_add_faq(self):
        tester = self.app.test_client(self)  
        response = tester.post('/addFAQ', data={'question': 'test', 'answer': 'test'})
        self.assertEquals(response.status_code, 302)