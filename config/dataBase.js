const mongoose = require('mongoose');
const config = require('config');
const dataBase = config.get('mongoURL');

const connectDB= async()=>{
    try {
        mongoose.connect(dataBase,{useNewUrlParser:true});
        console.log('Connected to database...');
    }
    catch(err) {
        console.error(err.message);
        // Exit process with failur
        process.exit(1);
    }
}
module.exports = connectDB;