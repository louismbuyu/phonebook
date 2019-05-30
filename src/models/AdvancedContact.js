const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    age: {
        type: Number
    },
    location: {
        type: Object
    },
    favorite: {
        type: Boolean
    },
});

module.exports = mongoose.model('advancedcontacts', ContactSchema);