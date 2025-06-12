const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
		content: {
            type: String,
            minLength: 5,
            required: true
        },
		important: Boolean,
});

noteSchema.set('toJSON', {
    transform: ( doc, rest ) => {
        rest.id = rest._id.toString();
        delete rest._id;
        delete rest.__v;    
    }
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;