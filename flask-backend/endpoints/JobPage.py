from flask import Blueprint, session, request, redirect,jsonify
from app import db
from models import Job

jobPage = Blueprint('jobPage',__name__)

@jobPage.route('/addJob', methods = ['GET', 'POST'])
def addJob():
    if request.method == 'POST':
        job_name = request.form['job_name']
        description = request.form['description']
        requirements = request.form['requirements']
        new_job = Job(job_name=job_name, description=description,requirements=requirements)
        db.session.add(new_job)
        db.session.commit()
        return redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')

@jobPage.route('/deleteJob', methods = ['GET', 'POST'])
def deleteJob():
    if request.method == 'POST':
        id = request.form['id']
        job = Job.query.filter_by(id=id).first()
        db.session.delete(job)
        db.session.commit()
        return redirect('https://www.youtube.com/watch?v=W3GrSMYbkBE')

@jobPage.route('/updateJob', methods = ['GET', 'POST'])
def updateJob():
    if request.method == 'POST':
        id = request.form['id']
        job = Job.query.filter_by(id-id).first()
        description = request.form['description']
        requirements = request.form['requirements']
        job.description = description
        job.requirements = requirements
        db.session.commit()
        return redirect('https://www.youtube.com/watch?v=U06jlgpMtQs')

@jobPage.route('/viewJob', methods=['GET','POST'])
def viewJobs():
    if request.method == 'POST':
        job_id = request.form['id']
        session['job_id'] = job_id
    return redirect('http://localhost:3000/jobs/job')

@jobPage.route('/getJobs', methods=['GET','POST'])
def getJobs():
    if request.method == 'GET':
        jobs = Job.query.all()
        return jsonify(jobs)

@jobPage.route('/getJobInfo')
def getJobInfo():
    if request.method == 'GET':
        job_id = session.get('job_id')
        job_info = Job.query.filter_by(id=job_id).first()
    return jsonify(job_info)