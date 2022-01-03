from flask import Blueprint, session, request, redirect, json
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from models import ListofJobs

jobPage = Blueprint('jobPage',__name__)

@jobPage.route('/addJob', methods = ['GET', 'POST'])
def addJob():
    if request.method == 'POST':
        job_name = request.form['job_name']
        description = request.form['description']
        requirements = request.form['requirements']
        new_job = ListofJobs(job_name=job_name, description=description,requirements=requirements)
        db.session.add(new_job)
        db.session.commit()
        return redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

@jobPage.route('/deleteJob', methods = ['GET', 'POST'])
def deleteJob():
    if request.method == 'POST':
        id = request.form['id']
        job = ListofJobs.query.filter_by(id-id).first()
        db.session.delete(job)
        db.session.commit()
        return redirect('https://www.youtube.com/watch?v=W3GrSMYbkBE')

@jobPage.route('/updateJob', methods = ['GET', 'POST'])
def updateJob():
    if request.method == 'POST':
        id = request.form['id']
        job = ListofJobs.query.filter_by(id-id).first()
        description = request.form['description']
        requirements = request.form['requirements']
        job.description = description
        job.requirements = requirements
        db.session.commit()
        return redirect('https://www.youtube.com/watch?v=U06jlgpMtQs')