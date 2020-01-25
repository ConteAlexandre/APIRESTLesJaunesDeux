const validate = require('mongoose-validator');

const nameValidate = [
    validate({
        validator: 'isLength',
        arguments: [2, 50],
        message: "Le nom doit faire entre 2 et 50 caractères"
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: "Le nom ne doit contenir que des caractères alphanumérique"
    })
];

const codeValidate = [
    validate({
        validator: 'isLength',
        arguments: [5, 6],
        message: "Le code postal doit être compris entre 5 et 6 chiffres"
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: "Le code postal ne doit contenir que des chiffres"
    })
];

module.exports = { codeValidate, nameValidate };