require('dotenv').config();
const mongoose = require('mongoose');
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@personalapp-s76gf.mongodb.net/test?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('DB Connected....');
    } catch(err) {
        console.log('DATABASE CONNECTION NOT ESTABLISHED: ', err);
    }
    
}

module.exports = connectDB;
