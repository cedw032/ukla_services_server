const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const db = require('./db');
const auth = require('./auth');

const PORT = process.env.PORT || 5000

const successResponse = (data) => ({status: 'success', data});
const errorResponse = ({message}) => ({status: 'error', message});

express()
	.use(bodyParser.json())
	.use(express.static(path.join(__dirname, 'public')))
	.post('/auth/register', async (req, res) => {
		try {
			const {username, password} = req.body;
			const result = await auth.register(username, password);
			res.send(successResponse(result));
		} catch (e) {
			console.error(e);
			res.send(errorResponse(e));
		}
	})
	.post('/auth/login', async (req, res) => {
		try {
			const {username, password} = req.body;
			const result = await auth.login(username, password);
			res.send(successResponse(result));
		} catch (e) {
			console.error(e);
			res.send(errorResponse(e));
		}
	})
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
