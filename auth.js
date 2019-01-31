var jwt = require('jsonwebtoken');
const db = require('./db');
const crypto = require('crypto');

const hash = (text) => {
	const hmac = crypto.createHmac('sha256', process.env.PASSWORD_HASH_SECRET);
	hmac.update(text);
	return hmac.digest('hex');
};

const auth = {
	register: async (username, password) => {

		const user = (await db.find('user', {username}) || [])[0];

		if (user) {
			throw new Error('User already exists');
		}

		const result = await db.create('user', [{
			username,
			password: hash(password)
		}]);

		return result;
	},

	login: async (username, password) => {
		const user = (await db.find('user', {username}) || [])[0];

		if (!user) {
			throw new Error('Unrecognised user');
		}

		if (hash(password) !== user.password) {
			throw new Error('Incorrect password');
		}

		const token = jwt.sign({userId: user.id}, process.env.PASSWORD_HASH_SECRET, {expiresIn: 60 * 60});

		return token;
	},
}

module.exports = auth;