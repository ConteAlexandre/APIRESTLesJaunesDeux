const express = require('express');

const cors = require('cors');

const morgan = require('morgan');

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log("CONNECTED"));

mongoose.connection.on('error', err => {
    console.log(`CONNECTION FAILED : ${err.message}`)
});
const app = express();


port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`l'API écoute sur le port : ${port}`)
});