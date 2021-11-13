#import configparser
import requests
from flask import Blueprint, request

weather_data = Blueprint('weather_data', __name__)

@weather_data.route('/weather_data', methods=['GET'])
def get_weather_data():
    city_name = request.form['city_name']
    api_key = 'e53647cd71abcf81c779b83f1a8807c1' #get_api_key()
    data = json_weather_data(city_name,api_key)
    return data

def json_weather_data(city_name,api_key):
    api_url = "http://api.openweathermap.org/data/2.5/weather?q={}&units=metric&appid={}".format(city_name, api_key)
    data = requests.get(api_url)
    return data.json()

#def get_api_key():
#    config = configparser.ConfigParser()
#    config.read('../config.ini')
#    return config['OpenWeatherMap']['api key']

#print(get_api_key())