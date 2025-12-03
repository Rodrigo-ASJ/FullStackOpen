const User = require('../models/user');
const bcrypt = require('bcrypt');

const defaultUsers = [
        {
            username: 'root',
            name: 'Superuser',
            password: 'sekret'
        },
        {
            username: 'johndoe',
            name: 'John Doe',
            password: 'sekretos'
        }
    ];

const initializeUsers = async () => {
    await User.deleteMany({});

    for( let user of defaultUsers){
        const passwordHash = await bcrypt.hash(user.password, 10);
        const newUser = new User({
            username: user.username,
            name: user.name,
            passwordHash
        });

        await newUser.save();
    }

    
}    



module.exports = {
    initializeUsers
}    