const validate = require('mongoose-validator');

const titleValidate = [
    validate({
        validator: 'isLength',
        arguments: [4, 30],
        message: "Le titre doit contenir entre 4 et 30 caractères"
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: "Le titre doit uniquement contenir des lettres, chiffres"
    })
];

const descriptionValidate = [
    validate({
        validator: 'isLength',
        arguments: [15, 500],
        message: "La description doit contenir entre 15 et 500 caractères"
    }),
];

module.exports = { titleValidate, descriptionValidate };