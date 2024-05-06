const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const girlSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

const Girl = mongoose.model('Girl', girlSchema);
module.exports = Girl;
