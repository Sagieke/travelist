from flask import Flask, request, redirect
from flask_sqlalchemy import SQLAlchemy
from api.weather import weather_data
from flask_bcrypt import Bcrypt
from flask_login import login_user, LoginManager, login_required, logout_user
app = Flask(__name__)

app.register_blueprint(weather_data)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/')
def server():
    return "<h1>Hello, this is the server, nothing of interest here :)</h1>"

@app.route('/usertest')
def test():
    return "<h1>User exists in database</h1>"

from models import LoginForm, RegisterForm, User

@app.route('/register', methods = ['GET', 'POST'])
def Register():
    form = RegisterForm()

    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data) #hashing password for security
        new_user = User(username=form.username.data, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return redirect('http://localhost:3000/') #redirecting to login page

#return render_template('http://localhost:3000/', form = form) #open eye
    

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(username = form.username.data).first() #checks if the user exists
        if user:
            if bcrypt.check_password_hash(user.password, form.password.data) : #if password matched continue
                login_user(user)
                redirect('http://localhost:3000/UserPage') #redircts to userpage

#return redirect('http://localhost:3000/', form = form)

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user() #loging out user
    return redirect('http://localhost:3000/') #redirects to sites maing page

@app.route('/listoflists', methods = ['GET','POST'])
@login_required
def AddtoList():
    if(request.method == "POST"):
        listname = request.form['listname']
        colour = request.form['colour']



if __name__ == '__main__':
    app.run(debug = True)