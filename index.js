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
		console.log('body', req.body);
		const result = db.create('user', req.body);
		res.send(result);
	} catch (err) {
		console.error(err);
		res.send("Error " + err);
	}
})
.get('/db', async (req, res) => {
	try {
		const client = await pool.connect()
		const result = await client.query('SELECT * FROM user');
		const results = { 'results': (result) ? result.rows : null};
		//res.render('pages/db', results );
		res.send(results);
		
	} catch (err) {
		console.error(err);
		res.send("Error " + err);
	}
})
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
