const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db');
const auth = require('./auth');

const PORT = process.env.PORT || 5000

const successResponse = (data) => ({status: 'success', data});
const errorResponse = ({message}) => ({status: 'error', message});

express()
	.use(cors())

	.use(bodyParser.json())

	.use(express.static(path.join(__dirname, 'public')))

	.post('/auth/register', async (req, res) => {
		try {
			const {username, password} = req.body;
			const result = await auth.register(username, password);
			res.json(successResponse(result));
		} catch (e) {
			console.error(e);
			res.json(errorResponse(e));
		}
	})

	.post('/auth/login', async (req, res) => {
		try {
			const {username, password} = req.body;
			const result = await auth.login(username, password);
			res.json(successResponse(result));
		} catch (e) {
			console.error(e);
			res.json(errorResponse(e));
		}
	})

	.post('/enrolment', async ({body: {students, enrolmentName}}, res) => {
		try {
			await db.create('student', students.map((student) => ({
				sid: student['SID'],
				name: student['Name'],
				quranTeacher: student['Teacher for Quran'],
				islamiayatTeacher: student['Teacher for Islamiayat'],
				grade: student['Islamiyat Grade'],
				intake: enrolmentName
			})));

			res.json(successResponse());
		} catch (e) {
			console.error(e);
			res.json(errorResponse(e));
		} 
	})

	.post('/query/intake', async (req, res) => {
		try {
			const intakes = await db.groups('student', 'intake');
			res.json(successResponse(intakes));
		} catch(e) {
			console.error(e)
			res.json(errorResponse(e))
		}
	})

	.post('/query/student', async ({body: {constraints}}, res) => {
		try {
			const students = await db.find('student', constraints);
			res.json(successResponse(students));
		} catch(e) {
			console.error(e)
			res.json(errorResponse(e))
		}
	})

	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
