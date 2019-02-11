toSnakeFromCamel = (camel) => {
	return (camel || '')
	.split('')
	.reduce((snake, char) => {
		const lowerCase = char.toLowerCase();
		snake += lowerCase !== char ? '_' + lowerCase : char;
		return snake;
	})
}

toCamelFromSnake = (snake) => {
	return (snake || '')
	.split('')
	.reduce(({isUpper, camel = ''}, char) => {
		const isUnderscore = char === '_';

		if (isUnderscore) return {isUpper: true, camel};

		camel += isUpper ? char.toUpperCase() : char;

		return {camel};

	}, {})['camel'];
}

module.exports = {
	toSnakeFromCamel,
	toCamelFromSnake,
}