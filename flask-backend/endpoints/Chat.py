from flask import Blueprint, request, render_template, redirect, url_for
from flask_socketio import join_room

chat_blueprint = Blueprint('chat_blueprint',__name__, template_folder='..templates')

from app import socketio

@chat_blueprint.route('/chat')
def chat():
    room = request.args.get('room')
    if room:
        return render_template('chat.html', room=room)
    else:
        return redirect(url_for('test'))

@socketio.on('join_room')
def handle_join_room_event(data):
    join_room(data['room'])
    socketio.emit('join_room_announcement', data)

@socketio.on('send_message')
def handle_send_message_event(data):
    socketio.emit('receive_message', data, room=data['room'])