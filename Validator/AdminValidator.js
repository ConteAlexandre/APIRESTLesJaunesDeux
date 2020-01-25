const validate = require('mongoose-validator');

const emailValidate = [
    validate({
        validator: 'isLength',
        arguments: [4, 100],
        message: "L'email doit contenir entre 4 et 100 caractères"
    }),
    validate({
        validator: 'isEmail',
        passIfEmpty: true,
        message: "Veuillez mettre un email valide"
    })
];

const firstnameValidate = [
    validate({
        validator: 'isLength',
        arguments: [4, 50],
        message: "Le prénom doit être compris entre 4 et 50 caractères"
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: "Le prénom ne doit contenir que des caratcères alphanumérique"
    }),
];

const lastnameValidate = [
    validate({
        validator: 'isLength',
        arguments: [4, 50],
        message: "Le nom de famille doit être compris entre 4 et 50 caractères"
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: "Le nom de famille ne doit contenir que des caratcères alphanumérique"
    }),
];

const usernameValidate = [
    validate({
        validator: 'isLength',
        arguments: [4, 50],
        message: "Le pseudo doit être compris entre 4 et 50 caractères"
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: "Le pseudo ne doit contenir que des caratcères alphanumérique"
    }),
];

module.exports = {emailValidate, firstnameValidate, lastnameValidate, usernameValidate};