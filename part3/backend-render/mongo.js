const mongoose = require('mongoose');


const db = process.env.MONGODB_URI;

mongoose.set('strictQuery',false);

mongoose.connect(db)
.then( result => {
    console.log('Connected to MongoDB');
})
.catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
})

