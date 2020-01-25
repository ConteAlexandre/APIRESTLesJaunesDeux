const validate = require('mongoose-validator');

const titleValidate = [
    validate({
        validator: 'isLength',
        arguments: [4, 25],
        message: "Le titre doit être compris entre 4 et 25 caractères"
    }),
];

module.exports = {titleValidate};