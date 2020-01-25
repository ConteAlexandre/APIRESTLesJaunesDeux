const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {emailValidate, firstnameValidate, lastnameValidate, usernameValidate} = require('../Validator/AdminValidator');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        validate: emailValidate
    },
    firstname: {
        type: String,
        required: [true, "Le prénom est obligatoire"],
        validate: firstnameValidate
    },
    lastname: {
        type: String,
        required: [ true, "Le nom de famille est obligatoire"],
        validate: lastnameValidate
    },
    username: {
        type: String,
        required: [ true, "Le pseudo est obligatoire"],
        validate: usernameValidate
    },
    hashed_password: {
        type: String,
        required: [ true, "Le mot de passe est obligatoire"]
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

//On créer un nom virtual que l'on devra remettre pour le champs a chaque fois
adminSchema.virtual('password')
    //Nous configurons le fait d'encrypter la valeur du champs
    .set(function(clean_password) {
        this._password = clean_password;
        //On fait appel à la méthode d'encryptage
        this.hashed_password = this.encryptPassword(clean_password);
    })
    //Voici ce que ça nosu retourne quand on veut récupérer le mot de passe
    .get(function() {
        return this._password;
    });

adminSchema.methods = {

    //On fait la verification
    authenticate: function (plainPassword) {
        return bcrypt.compareSync(plainPassword, this.hashed_password);
    },

    //On encrypt le mot de passe
    encryptPassword: function (password) {
        if (!password)
            return '';

        return bcrypt.hashSync(password, 10);
    }
};

module.exports = mongoose.model("Admin", adminSchema);