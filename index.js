const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db');
const PORT = process.env.PORT || 5000

express()
.use(bodyParser.json())
.use(express.static(path.join(__dirname, 'public')))
.post('/user', async (req, res) => {
	try {
		const result = await db.create('user', req.body);
		res.send(result);
	} catch (e) {
		console.error(e);
		res.send(e);
	}
})
.get('/user', async (req, res) => {
	try {
		const result = await db.all('user');
		res.send(result);
	} catch (e) {
		console.error(e);
		res.send(e);
	}
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
