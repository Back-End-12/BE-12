//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB);

module.exports = mongoose;
