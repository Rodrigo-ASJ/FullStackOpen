const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		const passwordCorrect = user === null 
            ? false 
            : await bcrypt.compare(password, user.passwordHash);

		if (!(user && passwordCorrect)) {
			return res.status(401).json({
				error: 'invalid username or password',
			});
		}

		const userForToken = {
			username: user.username,
			id: user._id,
		};
		
		// el token expira in 60*60 segundos, eso es, en una hora
		const token = jwt.sign(
			userForToken,
			process.env.SECRET,
			{ expiresIn: 60*60 }
		);

		res.status(200).send({ token, username: user.username, name: user.name });
	} catch (error) {
		next(error);
	}
});

module.exports = loginRouter;
