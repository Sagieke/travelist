from app import db, ma


class User(db.Model): #user data base
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100),unique = True, nullable = False)
    password = db.Column(db.String(100), nullable = False)

class ListOfLists(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable = False)
    color = db.Column(db.String(7), nullable = False)

class ListOfListsSchema(ma.SQLAlchemySchema):
    class Meta:
        model = ListOfLists()

    id = ma.auto_field()
    name = ma.auto_field()
    color = ma.auto_field()

ListOfLists_Schema = ListOfListsSchema()

db.create_all()