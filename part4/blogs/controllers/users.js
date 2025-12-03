const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res, next)=>{
    try{
        const allUsers = await User.find({}).populate('blogs', { url:1, title:1, author:1, likes:1});
        res.status(200).json(allUsers);
    }
    catch(exception){
        next(exception);
    }
});

usersRouter.get('/:id', async (req, res, next)=>{
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        if(user){
            res.status(200).json(user);
        } else { 
            res.status(404).end();
        }
    }catch(exception){
        next(exception);
    }
})

usersRouter.post('/', async(req, res, next)=>{
    const {username, name, password} = req.body;

    if(!password || password.length < 3){
        return res.status(400)
            .json({
                error: 'Password is required and must be at least 3 characters long'
            });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const newUser = new User({
        username,
        name,
        passwordHash
    });

    try{

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }
    catch(exception){
        next(exception);
    }
});

module.exports = usersRouter;