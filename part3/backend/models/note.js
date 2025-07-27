const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({ 
    content:{ 
        type:String,
        minLength: 5,
        required: true
    },
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

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;