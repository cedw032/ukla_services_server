const escape = require('pg-escape');
const { Pool } = require('pg');
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: !process.env.IS_DEV
});

module.exports = {
	create: async (entity, data) => {
		const client = await pool.connect()

		const fields = Object.keys(data).map((key) => escape.ident(key)).join(',')
		const values = Object.keys(data).map((key) => escape.literal(data[key])).join(',')

		const query = escape('INSERT INTO %I (' + fields + ') VALUES (' + values + ')', entity)

		const result = await client.query(query)
		client.release();	

		return (result || {}).rows;
	},

	all: async (entity) => {
		const client = await pool.connect()		
		const query = escape('SELECT * FROM %I', entity)

		const result = await client.query(query)
		client.release();	

		return (result || {}).rows;
	},

	find: async (entity, constraints) => {
		const client = await pool.connect()	
		
		const conditions = Object.keys(constraints).map((key) => escape.ident(key) + '=' + escape.literal(constraints[key])).join(' AND ');

		const query = escape('SELECT * FROM %I WHERE ' + conditions, entity)

		const result = await client.query(query)
		client.release();	

		return (result || {}).rows;	
	}
}
