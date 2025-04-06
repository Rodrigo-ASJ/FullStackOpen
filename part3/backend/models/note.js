const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
    .then( result => { console.log( "connected to MongoDB" )})
    .catch( error => { console.log("error connecting to MongoDB:", error.message)});

const noteSchema = new mongoose.Schema({ 
    content: String,
    important: Boolean,
});

// modificar la respuesta de la base de datos en tiempo de ejecución, no cambia la base de datos
noteSchema.set('toJSON', {
    transform: ( doc, ret) =>{
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

const Note = mongoose.model( 'Note', noteSchema);

module.exports = Note;