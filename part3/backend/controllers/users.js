const usersRouter = require('express').Router();
const User = require('../models/user');
//encriptar contraseñas
const bcrypt = require('bcrypt');

usersRouter.post('/', async (req, res, next ) => {
	const { username, name, password } = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	try {
		const savedUser = await user.save();
		res.status(201).json(savedUser);
	} catch (exception) {
		next(exception);
	}
});

usersRouter.get('/', async ( req, res, next )=>{
try {
		const AllUsers = await User.find({}).populate('notes', { content: 1, important: 1 });
		res.json(AllUsers);
} catch (error) {
	next(error);
}
})

module.exports = usersRouter;
