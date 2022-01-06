from app import  db
from models import BugReport
from test_Homepage import MyTest

class UserListTest(MyTest):
    def test_add_bug_db(self):
        bug = BugReport(title = 'testitle', description = 'testdescription',status= 'testing',statuscolor = '#ffffff')
        db.session.add(bug)
        db.session.commit() 
        assert bug in db.session

    def test_delete_bug_db(self):
        bug = BugReport(title = 'testitle', description = 'testdescription',status= 'testing',statuscolor = '#ffffff')
        db.session.add(bug)
        db.session.commit() 
        bug = BugReport.query.filter_by(id=1).first()
        db.session.delete(bug)
        db.session.commit() 
        assert bug not in db.session

    def test_add_bug(self):
        tester = self.app.test_client(self)  
        response = tester.post('/submitBug', data={'title': 'test', 'description': 'test'})
        self.assertRedirects(response, 'http://localhost:3000/userpage')

    def test_delete_bug(self):
        bug = BugReport(title = 'testitle', description = 'testdescription',status= 'testing',statuscolor = '#ffffff')
        db.session.add(bug)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/deleteBug', data={'id': '1'})
        self.assertRedirects(response,'http://localhost:3000/techsupport')

    def test_update_bug_status_tech(self):
        bug = BugReport(title = 'testitle', description = 'testdescription',status= 'testing',statuscolor = '#ffffff')
        db.session.add(bug)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/ChangeBugStatusTech', data={'id':'1','priority':'priority'})
        self.assertRedirects(response,'http://localhost:3000/techsupport')
    
    def test_update_bug_status_admin(self):
        bug = BugReport(title = 'testitle', description = 'testdescription',status= 'testing',statuscolor = '#ffffff')
        db.session.add(bug)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/ChangeBugStatusAdmin', data={'id':'1'})
        self.assertRedirects(response,'http://localhost:3000/adminpage')