const express = require('express');
const app = express();

const cors = require('cors');

const morgan = require('morgan');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log("CONNECTED"));

mongoose.connection.on('error', err => {
    console.log(`CONNECTION FAILED : ${err.message}`)
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./Routes/ConsumerRoutes'));
app.use('/admin', require('./Routes/AdminRoutes'));
app.use('/city', require('./Routes/CityRoutes'));
app.use('/rubrique', require('./Routes/RubricRoutes'));
app.use('/articleAdmin', require('./Routes/ArticleAdminRoutes'));

port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`l'API écoute sur le port : ${port}`)
});