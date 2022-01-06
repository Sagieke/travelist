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
        new_report = BugReport(title=title, description=description, status = 'Pending', statuscolor = '#ff0000',priority = '')
        db.session.add(new_report)
        db.session.commit()
        return redirect('http://localhost:3000/userpage')
    else : redirect('http://localhost:3000/pagenotfound')

#Requirement 106
@bug.route('/getBugsTech',methods=['GET','POST'])
def getBugsTech():
    if request.method == 'GET':
        bugs = BugReport.query.filter_by(status = 'Pending').all()
        return jsonify(bugs)
    else : redirect('http://localhost:3000/pagenotfound')

@bug.route('/getBugsAdmin',methods=['GET','POST'])
def getBugsAdmin():
    if request.method == 'GET':
        bugs = BugReport.query.filter_by(status = 'In Treatment').all()
        return jsonify(bugs)
    else : redirect('http://localhost:3000/pagenotfound')

@bug.route('/ChangeBugStatusTech',methods=['GET','POST'])
def ChangeBugStatusTech():
    if request.method == 'POST':
        bug_id = request.form['id']
        priority = request.form['priority']
        bug = BugReport.query.filter_by(id = bug_id).first()
        if bug.status == 'Pending':
            bug.status = 'In Treatment'
            bug.statuscolor = '#ffee00'
            bug.priority = priority
        else: 
            bug.status = 'Pending'
            bug.statuscolor = '#ff0000'
            bug.priority = 'Low'
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')
    else : redirect('http://localhost:3000/pagenotfound')

@bug.route('/ChangeBugStatusAdmin',methods=['GET','POST'])
def ChangeBugStatusAdmin():
    if request.method == 'POST':
        bug_id = request.form['id']
        bug = BugReport.query.filter_by(id = bug_id).first()
        if bug.status == 'In Treatment':
            bug.status = 'Treated'
            bug.statuscolor = '#80fa5b'
        else: 
            bug.status = 'In Treatment'
            bug.statuscolor = '#ffee00'
        db.session.commit()
        return redirect('http://localhost:3000/adminpage')
    else : redirect('http://localhost:3000/pagenotfound')

@bug.route('/deleteBug',methods=['GET','POST'])
def deleteBug():
    if request.method == 'POST':
        bug_id = request.form['id']
        bug = BugReport.query.filter_by(id = bug_id).first()
        db.session.delete(bug)
        db.session.commit()
        return redirect('http://localhost:3000/techsupport')
    else : redirect('http://localhost:3000/pagenotfound')