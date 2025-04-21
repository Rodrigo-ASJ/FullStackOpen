const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const URL = process.env.MONGO_DB_URI;

console.log('connecting to', URL);

mongoose.connect(URL)
    .then(() => {
        console.log('connected to MongoDB');
    }).catch((error) => {
        console.error('error connecting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
}); 

// modificar la respuesta de la base de datos en tiempo de ejecución, no cambia la base de datos
personSchema.set('toJSON',{
    transform: (doc, ret) =>{
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;