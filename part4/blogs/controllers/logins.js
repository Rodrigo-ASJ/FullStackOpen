const loginsRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginsRouter.post('/', async (req, res, next)=> {
        const { username, password } = req.body;

        const isUser = await User.findOne({ username });

        const passwordCorrect = isUser === null 
            ? false 
            : await bcrypt.compare(password, isUser.passwordHash);

        if(!(isUser && passwordCorrect)){
            return res.status(401).json({
                error: 'invalid username or password'
            });
        }

        try{
            const userForToken = {
                username: isUser.username,
                id: isUser._id
            };

            const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60 })

            res.status(200)
                .send({ token, 
                        username: isUser.username,
                        name: isUser.name 
                    });

        }catch(exception){
            next(exception);
        }
})


module.exports = loginsRouter;