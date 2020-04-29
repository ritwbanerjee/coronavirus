const mongoose =  require('mongoose');
const user = new mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', user);