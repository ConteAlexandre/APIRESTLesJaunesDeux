const expressJwt = require('express-jwt');

module.exports = {
    //Ceci va nous permettre de sire qu'un token est obligatoire pour faire l'action
    requireSignin: expressJwt({
        secret: process.env.JWT_SECRET,
        //Ici on va dire que les propriétés de l'user dans le token sont contenu dans auth
        userProperty: "auth"
    }),
}