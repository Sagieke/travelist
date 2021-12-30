from app import  db
from models import ListOfPlaces,ListOfLists
from werkzeug.security import generate_password_hash
from test_Homepage import MyTest

class ListofPlacesTest(MyTest):

    def test_add_place(self):
        list = ListOfLists(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        tester = self.app.test_client(self)  
        response = tester.post('/addplace', data={'user_id': '1', 'list_id': '1',
                               'place_name' : 'Dubai', 'start_date' : '1.1.2022',
                               'end_date' : '2.1.2022'})
        self.assertRedirects(response, 'http://localhost:3000/userpage/places')

    def test_remove_place(self):
        tester = self.app.test_client(self)  
        list = ListOfLists(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/addplace', data={'user_id': '1', 'list_id': '1',
                               'place_name' : 'Dubai', 'start_date' : '1.1.2022',
                               'end_date' : '2.1.2022'})
        response = tester.post('/removeplace', data={'user_id': '1', 'list_id': '1','place_id' : '1'})
        self.assertRedirects(response, 'http://localhost:3000/userPage/places')

    def test_view_place(self):
        list = ListOfLists(user_id = '1', id = '1', name="testlist", color = '#ffffff')
        db.session.add(list)
        db.session.commit()
        tester = self.app.test_client(self)  
        start = tester.post('/viewplace', data={'user_id': '1', 'list_id': '1',
                               'place_name' : 'Dubai', 'start_date' : '1.1.2022',
                               'end_date' : '2.1.2022'})
        response = tester.post('/viewplace', data={'place_id' : '1',})
        self.assertRedirects(response, 'http://localhost:3000/UserPage/places/place')