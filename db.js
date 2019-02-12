
const { Pool } = require('pg');

const {
	identifier,
	literal,
	model,
} = require('./utils/dbPrepare');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: !process.env.IS_DEV
});

module.exports = {
	// create('entity', [{field:'value'}]);
	create: async (entity, data) => {
		const client = await pool.connect();

		const [first] = data;
		const keys = Object.keys(first);

		const buildValueSet = (item) => '(' + keys.map((key) => literal(item[key])).join(',') + ')';

		const values = data.map((item) => buildValueSet(item)).join(',');
		const fields = keys.map((key) => identifier(key)).join(',');

		const query = `
			INSERT INTO ${identifier(entity)}
			(
				${fields}
			)
			VALUES
				${values};
		`;

		const result = await client.query(query);
		client.release();	

		return (result || {}).rows.map(model);
	},

	// update('entity', {id: {field: value}})
	update: async (entity, data) => {

		const client = await pool.connect();

		const queries = Object.keys(data).map((id) => `
			UPDATE ${identifier(entity)}
			SET ${
				Object.keys(data[id]).map((field) => `
					${identifier(field)}
					=
					${literal(data[id][field])}
				`).join(',')
			}
			WHERE id=${literal(id)}
		`)

		const result = await client.query(queries.join(';'));
		client.release();	

		const {rows = []} = (result || {});
		return rows.map(model);
			
	},

	all: async (entity) => {
		const client = await pool.connect()		
		const query = `SELECT * FROM ${identifier(entity)}`;

		const result = await client.query(query)
		client.release();	

		const {rows = []} = (result || {});
		return rows.map(model);
	},

	find: async (entity, constraints) => {
		const client = await pool.connect()	
		
		const conditions = Object.keys(constraints).map(key => 
			`${identifier(key)} IN (${constraints[key].map(value =>
				literal(value)
			).join(',')})` 
		).join(' AND ');

		const query = `
			SELECT * FROM ${identifier(entity)}
			WHERE ${conditions}
		`;

		const result = await client.query(query)
		client.release();	

		const {rows = []} = (result || {});
		return rows.map(model);	
	}, 

	groups: async (entity, field) => {
		const client = await pool.connect()		

		entity = identifier(entity); 
		field = identifier(field); 

		const query = `SELECT ${field} FROM ${entity} GROUP BY ${field}`;

		const result = await client.query(query)
		client.release();	

		const {rows = []} = (result || {});
		return rows
			.map(model)
			.map(({[field]: value}) => value);
	}
}
