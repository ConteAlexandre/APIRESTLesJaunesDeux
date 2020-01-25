const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`l'API écoute sur le port : ${port}`)
});