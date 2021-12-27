from flask import Blueprint, request, session,redirect
from app import db
from models import User
from werkzeug.security import generate_password_hash

Userpage = Blueprint('Userpage',__name__)

@Userpage.route('/changepassword', methods = ['GET', 'POST'])
def ChangePassword():
    if request.method == 'POST':
        user_id = session.get('user_id')
        new_password = generate_password_hash(request.form['new_password'])
        user = User.query.filter_by(id = user_id).first()
        user.password = new_password
        db.session.commit()
        return redirect('http://localhost:3000/userpage')
        