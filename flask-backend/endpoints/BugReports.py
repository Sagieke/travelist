from flask import Blueprint, request, redirect, jsonify
from app import db
from models import BugReport

bug = Blueprint('bug',__name__)

@bug.route('/submitBug',methods=['GET','POST'])
def submitBug():
    if request.method == 'POST':
        #user_name = session.get("username")
        title = request.form['title']
        description = request.form['description']
        new_report = BugReport(title=title, description=description, status = 'Pending', statuscolor = '#ff0000')
        db.session.add(new_report)
        db.session.commit()
        return redirect('http://localhost:3000/')

@bug.route('/getBugs',methods=['GET','POST'])
def getFAQ():
    if request.method == 'GET':
        bugs = BugReport.query.all()
        return jsonify(bugs)

@bug.route('/ChangeBugStatusTech',methods=['GET','POST'])
def ChangeBugStatusTech():
    if request.method == 'POST':
        bug_id = request.form['id']
        bug = BugReport.query.filter_by(id = bug_id).first()
        if bug.status == 'Pending':
            bug.status = 'In Treatment'
            bug.statuscolor = '#ffee00'
        else: 
            bug.status = 'Pending'
            bug.statuscolor = '#ff0000'
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')

@bug.route('/ChangeBugStatusAdmin',methods=['GET','POST'])
def ChangeBugStatusAdmin():
    if request.method == 'POST':
        bug_id = request.form['id']
        bug = BugReport.query.filter_by(id = bug_id).first()
        if bug.status == 'Pending':
            bug.status = 'Treated'
            bug.statuscolor = '#80fa5b'
        else: 
            bug.status = 'Pending'
            bug.statuscolor = '#ff0000'
        db.session.commit()
        return redirect('http://localhost:3000/adminpage')

@bug.route('/deleteBug',methods=['GET','POST'])
def deleteBug():
    if request.method == 'POST':
        bug_id = request.form['id']
        bug = BugReport.query.filter_by(id = bug_id).first()
        db.session.delete(bug)
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')
