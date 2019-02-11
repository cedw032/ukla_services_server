const escape = require('pg-escape');

const { 
	toSnakeFromCamel,
	toCamelFromSnake,
} = require('./casing');

const literal = value => escape.literal(value + '');
const identifier = value => escape.ident(toSnakeFromCamel(value));

const model = item => Object.keys(item).reduce((model, key) => 
	({
		...model,
		[toCamelFromSnake(key)]: item[key],
	})
, {});

module.exports = {
	literal,
	identifier,
	model,
}