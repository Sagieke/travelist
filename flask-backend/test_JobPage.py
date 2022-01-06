from app import  db
from models import Job
from test_Homepage import MyTest

class ListPageTest(MyTest):
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