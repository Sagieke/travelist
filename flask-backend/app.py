from flask import Flask
from api.weather import weather_data

app = Flask(__name__)
app.register_blueprint(weather_data)
