require('dotenv').config();
const mongoose = require('mongoose');


const mongoURL = process.env.MONGO_URI + process.env.DB_NAME;

const mongoConnect = () => {
    mongoose.connect(mongoURL, (err) => {
        if (!err) {
            console.log("Connected to MongoDB Altas: DataBase -  " + process.env.DB_NAME);
        }
    });
}

module.exports=mongoConnect;