const mongoose = require('mongoose');
const {nameValidate, codeValidate} = require('../Validator/CityValidator');

citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Il faut un nom pour une ville" ],
        validate: nameValidate
    },
    code_postal: {
        type: String,
        required: true,
        validate: codeValidate
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    },
    is_enabled: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("City", citySchema);