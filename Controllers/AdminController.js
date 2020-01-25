const Admin = require('../Models/AdminModel');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

module.exports = {
    AdminById: async (req, res, next, id) => {
        Admin.findById(id)
            .exec((err, admin) => {
                if (err || !admin){
                    return res.status(400).json({
                        error: "Admin non trouvé"
                    })
                }
                req.profile = admin;
                next()
            })
    },
    createAdmin: async (req, res) => {
        const adminExist = await Admin.findOne({ email: req.body.email });
        if (adminExist) return res.status(403).json({
            error: "L'email est déjà existant"
        });

        const admin = await new Admin(req.body);

        admin.save()
            .then(admin => {
                res.status(200).json({ message: "Bravo vous voici enregistrer !"})
            })
            .catch(err => {
                if (err['errors']['firstname']) return res.status(401).json({ error: err['errors']['firstname']['message']});
                if (err['errors']['lastname']) return res.status(401).json({ error: err['errors']['lastname']['message']});
                if (err['errors']['username']) return res.status(401).json({ error: err['errors']['username']['message']});
                if (err['errors']['email']) return res.status(401).json({ error: err['errors']['email']['message']});
                if (err['errors']['hashed_password']) return res.status(401).json({ error: err['errors']['hashed_password']['message']});
            })
    },
    loginAdmin: async (req, res) => {
        const {email, password} = req.body;

        Admin.findOne({email}, (err, admin) => {
            //Si il y a une erreur ou utilisateur non trouvé
            if (err || !admin) {
                res.status(401).json({error: 'Email non trouvé'})
            } else

                //Si le mot de passe ne correspond pas à celui en bdd
            if (admin.authenticate(password)) {

                //Générons un token lors de la connexion et enregistrons certaines données de l'user
                const token = jwt.sign({_id: admin._id, name: admin.name}, process.env.JWT_SECRET);

                //On sauvegarde le token dans un cookie avec une durée et un nom
                res.cookie('t', token, {expire: new Date() + 9999});

                //On retourne l'utilisateur avec le token
                const {_id, email, name, createdAt} = admin;
                res.json({token, user: {_id, name, email, createdAt}})

            } else {
                res.status(401).json({error: 'Le mot de passe est incorrect'})
            }
        })
    }
}