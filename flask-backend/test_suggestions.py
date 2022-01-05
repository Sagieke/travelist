from app import  db
from models import ListofSuggestions
from test_Homepage import MyTest

class UserListTest(MyTest):
    def test_add_suggestion_db(self):
        suggestion = ListofSuggestions(title = 'testitle', description = 'testdescription', status = 'status')
        db.session.add(suggestion)
        db.session.commit() 
        assert suggestion in db.session

    def test_delete_suggestion_db(self):
        suggestion = ListofSuggestions(title = 'testitle', description = 'testdescription', status = 'status')
        db.session.add(suggestion)
        db.session.commit() 
        suggestion = ListofSuggestions.query.filter_by(id=1).first()
        db.session.delete(suggestion)
        db.session.commit()
        assert suggestion not in db.session

    def test_add_suggestion(self):
        tester = self.app.test_client(self)  
        response = tester.post('/submitSuggestion', data={'title': 'test', 'description': 'test'})
        self.assertRedirects(response, 'http://localhost:3000/')

    def test_delete_suggestion(self):
        suggestion = ListofSuggestions(title='title', description='description', status = 'status')
        db.session.add(suggestion)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/deleteSuggestion', data={'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/techsupport')