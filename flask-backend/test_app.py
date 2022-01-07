import unittest
from flask_testing import TestCase
from app import create_app, db
from models import *
from werkzeug.security import generate_password_hash

class App_Test(TestCase):
    def create_app(self):
        app = create_app(True,'sqlite://')
        return app

    def tearDown(self):
        db.session.remove()
        db.drop_all()

class Homepage_Test(App_Test):

    def test_db_add_user(self):
        user = User(username="username", password="password", usertype = "usertype", answer = "answer", question = 'question')
        db.session.add(user)
        db.session.commit()
        assert user in db.session

    def test_Register(self):
        tester = self.app.test_client(self)  
        response = tester.post('/register', data={'email': 'username', 'password': 'password', 'question' : 'question','answer':'answer'})
        self.assertRedirects(response, 'http://localhost:3000/')
    
    def test_Login_traveler(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "Traveler", answer = "answer", question = 'test')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')
    
    def test_Login_techsupport(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "TechSupport", answer = "answer", question = 'test')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/techSupport')

    def test_Login_admin(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "Admin", answer = "answer", question = 'test')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/login', data={'email': 'username', 'password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/adminPage')

    def test_forgotPasswordValidation(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/forgotPasswordValidation', data={ 'email': 'username','question' : 'question','answer': 'answer'})
        self.assertRedirects(response, 'http://localhost:3000/userpage')
    
    def test_forgotPasswordChange(self):
        password = generate_password_hash("password")
        user = User(username="username", password = password, usertype = "usertype", answer = "answer", question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/forgotPasswordValidation', data={ 'email': 'username','question' : 'question','answer': 'answer'})
        response = tester.post('/forgotPasswordChange', data={'password': 'newpassword', 'confirm' : 'newpassword'})
        self.assertRedirects(response, 'http://localhost:3000/%27')

class UserPage_Test(App_Test):
    def test_change_password(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer",question = 'question', rating = 0)
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/login', data={'email': 'username', 'password': 'password'})
        response = tester.post('/changepassword', data={'user_id': '1', 'new_password': 'password'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_addlist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer",question = 'question', rating = 0)
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        response = tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_removelist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer",question = 'question', rating = 0)
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        response = tester.post('/removelist', data={'user_id': '1', 'list_id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_viewlist(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "admin", answer = "answer",question = 'question', rating = 0)
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/addlist', data={'user_id': '1', 'list_name': 'testlist', 'color' : '#ffffff'})
        response = tester.post('/viewlist', data={'list_id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/userPage/places')

    def test_getlists(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "traveler", answer = "answer",question = 'question', rating = 0)
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)
        tester.post('/login', data={'email': 'username', 'password': 'password'})
        list = List(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        test = [{'color' : '#ffffff','id' : 1,'name' : 'testlist','user_id' : 1}]
        response = tester.get('/getlists', data={'user_id': '1'})
        self.assertEqual(response.json,test)

class UserList_Test(App_Test):
    def test_change_permission_tech_TECH(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionTech', data={'role': 'TECH', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/techsupport')

    def test_change_permission_tech_TRAVELER(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionTech', data={'role': 'TRAVELER', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/techsupport')

    def test_change_permission_admin_ADMIN(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionAdmin', data={'role': 'ADMIN', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_change_permission_admin_TECH(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionAdmin', data={'role': 'TECH', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_change_permission_admin_TRAVELER(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/changePermissionAdmin', data={'role': 'TRAVELER', 'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_delete_user(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/deleteUser', data={'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_delete_user_db(self):
        password = generate_password_hash("password")
        user = User(username="username", password=password, usertype = "usertype", answer = "answer",question = 'question')
        db.session.add(user)
        db.session.commit()
        user = User.query.filter_by(id = 1).first()
        db.session.delete(user)
        db.session.commit()
        assert user not in db.session

class BugReport_Test(App_Test):
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

class FAQ_Test(App_Test):
    def test_add_faq_db(self):
        faq = FAQ(question = 'testquestion', answer = 'testanswer')
        db.session.add(faq)
        db.session.commit() 
        assert faq in db.session

    def test_add_faq(self):
        tester = self.app.test_client(self)  
        response = tester.post('/addFAQ', data={'question': 'test', 'answer': 'test'})
        self.assertRedirects(response, 'http://localhost:3000/techSupport')

    def test_delete_faq(self):
        faq = FAQ(question = 'question', answer = 'answer')
        db.session.add(faq)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/deleteFAQ', data={'id': '1'})
        self.assertRedirects(response,'http://localhost:3000/techSupport')

    def test_update_faq(self):
        faq = FAQ(question = 'question', answer = 'answer')
        db.session.add(faq)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/updateFAQ', data={'id':'1','question': 'test', 'answer': 'test'})
        self.assertRedirects(response,'http://localhost:3000/adminpage')

class JobPage_Test(App_Test):
    def test_add_job_db(self):
        job = Job(title = 'testitleTech', description = 'testdescription',requirements = 'testrequirements')
        db.session.add(job)
        db.session.commit() 
        assert job in db.session

    def test_delete_job_db(self):
        job = Job(title = 'testitleTech', description = 'testdescription',requirements = 'testrequirements')
        db.session.add(job)
        db.session.commit() 
        job = Job.query.filter_by(id = 1).first()
        db.session.delete(job)
        db.session.commit() 
        assert job not in db.session

    def test_add_job(self):
        tester = self.app.test_client(self)  
        response = tester.post('/addJob', data={'title': 'test', 'description': 'test', 'requirements': 'requirements'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_delete_job(self):
        job = Job(title = 'testitleTech', description = 'testdescription',requirements = 'testrequirements')
        db.session.add(job)
        db.session.commit() 
        tester = self.app.test_client(self)  
        response = tester.post('/deleteJob', data={'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_update_job(self):
        job = Job(title = 'testitleTech', description = 'testdescription',requirements = 'testrequirements')
        db.session.add(job)
        db.session.commit() 
        tester = self.app.test_client(self)  
        response = tester.post('/deleteJob', data={'id': '1','description': 'test', 'requirements': 'requirements'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_view_jobs(self):
        job = Job(title = 'testitleTech', description = 'testdescription',requirements = 'testrequirements')
        db.session.add(job)
        db.session.commit() 
        tester = self.app.test_client(self)  
        response = tester.post('/viewJob', data={'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/jobs/job')

class PlacePage_Test(App_Test):

    def test_add_place(self):
        list = List(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/addplace', data={'user_id': '1', 'list_id': '1',
                               'place_name' : 'Dubai', 'start_date' : '1.1.2022',
                               'end_date' : '2.1.2022'})
        self.assertRedirects(response, 'http://localhost:3000/userpage/places')

    def test_remove_place(self):
        tester = self.app.test_client(self)  
        list = List(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/addplace', data={'user_id': '1', 'list_id': '1',
                               'place_name' : 'Dubai', 'start_date' : '1.1.2022',
                               'end_date' : '2.1.2022'})
        response = tester.post('/removeplace', data={'user_id': '1', 'list_id': '1','place_id' : '1'})
        self.assertRedirects(response, 'http://localhost:3000/userPage/places')

    def test_view_place(self):
        list = List(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/viewplace', data={'user_id': '1', 'list_id': '1',
                               'place_name' : 'Dubai', 'start_date' : '1.1.2022',
                               'end_date' : '2.1.2022'})
        response = tester.post('/viewplace', data={'place_id' : '1',})
        self.assertRedirects(response, 'http://localhost:3000/UserPage/places/place')

class AdminMessage_Test(App_Test):
    def test_add_Message_Admin_db(self):
        message = AdminMessage(title = 'testitleAdmin', description = 'testdescription')
        db.session.add(message)
        db.session.commit() 
        assert message in db.session

    def test_delete_Message_Admin_db(self):
        message = AdminMessage(title = 'testitleAdmin', description = 'testdescription')
        db.session.add(message)
        db.session.commit() 
        message = AdminMessage.query.filter_by(id=1).first()
        db.session.delete(message)
        db.session.commit()
        assert message not in db.session

    def test_add_Message_All_Admin(self):
        tester = self.app.test_client(self)  
        response = tester.post('/messageSenderFromAdminToAll', data={'title': 'test', 'description': 'test'})
        self.assertRedirects(response, 'http://localhost:3000/adminpage')

    def test_delete_Message_Admin(self):
        new_message = AdminMessage(title='title', description='description')
        db.session.add(new_message)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/messageDeleterAdmin', data={'id': '1'})
        self.assertRedirects(response, 'http://127.0.0.1:5000/')

class TechSupportMessage_Test(App_Test):
    def test_add_Message_Tech_db(self):
        message = TechSupportMessage(title = 'testitleTech', description = 'testdescription',answer = 'answer', status = 'status')
        db.session.add(message)
        db.session.commit() 
        assert message in db.session

    def test_delete_Message_Tech_db(self):
        message = TechSupportMessage(title = 'testitleATech', description = 'testdescription',answer = 'answer', status = 'status')
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
        self.assertRedirects(response, 'http://localhost:3000/userPage')

    def test_message_Deleter_Tech(self):
        new_message = TechSupportMessage(title = 'testitleATech', description = 'testdescription',answer = 'answer', status = 'status')
        db.session.add(new_message)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/messageDeleterTech', data={'id': '1'})
        self.assertRedirects(response, 'http://127.0.0.1:5000/')

class SuggestionsList_Test(App_Test):
    def test_add_suggestion_db(self):
        suggestion = Suggestion(title = 'testitle', description = 'testdescription', status = 'status')
        db.session.add(suggestion)
        db.session.commit() 
        assert suggestion in db.session

    def test_delete_suggestion_db(self):
        suggestion = Suggestion(title = 'testitle', description = 'testdescription', status = 'status')
        db.session.add(suggestion)
        db.session.commit() 
        suggestion = Suggestion.query.filter_by(id=1).first()
        db.session.delete(suggestion)
        db.session.commit()
        assert suggestion not in db.session

    def test_add_suggestion(self):
        tester = self.app.test_client(self)  
        response = tester.post('/submitSuggestion', data={'title': 'test', 'description': 'test'})
        self.assertRedirects(response, 'http://localhost:3000/')

    def test_delete_suggestion(self):
        suggestion = Suggestion(title='title', description='description', status = 'status')
        db.session.add(suggestion)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/deleteSuggestion', data={'id': '1'})
        self.assertRedirects(response, 'http://localhost:3000/techsupport')

if __name__ == '__main__':
    unittest.main()