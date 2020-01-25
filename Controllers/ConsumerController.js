const Consumer = require('../Models/ConsumerModel');
const jwt = require('jsonwebtoken');

module.exports = {
    consumerById: async (req, res, next, id) => {
        Consumer.findById(id)
            .exec((err, consumer) => {
                if (err || !consumer){
                    return res.status(400).json({
                        error: "Consumer non trouvé"
                    })
                }
                req.profile = consumer;
                next()
            })
    },
    signup: async (req, res) => {
        const consumerExist = await Consumer.findOne({ email: req.body.email });
        if (consumerExist) return res.status(403).json({
            error: "L'email existe déjà"
        });

        const consumer = await Consumer(req.body);
        consumer.save()
            .then(consumer => {
                res.status(200).json({ message: "Bravo, vous voila inscrit maintenant il ne reste plus qu'à vous connecter"})
            })
            .catch(err => {
                if (err['errors']['firstname']) return res.status(401).json({ error: err['errors']['firstname']['message']});
                if (err['errors']['lastname']) return res.status(401).json({ error: err['errors']['lastname']['message']});
                if (err['errors']['username']) return res.status(401).json({ error: err['errors']['username']['message']});
                if (err['errors']['email']) return res.status(401).json({ error: err['errors']['email']['message']});
                if (err['errors']['hashed_password']) return res.status(401).json({ error: err['errors']['hashed_password']['message']});
            })
    },
    loginConsumer: async (req, res) => {
        const {email, password} = req.body;

        Consumer.findOne({email}, (err, consumer) => {
            //Si il y a une erreur ou utilisateur non trouvé
            if (err || !consumer) {
                res.status(401).json({error: 'Email non trouvé'})
            } else

                //Si le mot de passe ne correspond pas à celui en bdd
            if (consumer.authenticate(password)) {

                //Générons un token lors de la connexion et enregistrons certaines données de l'user
                const token = jwt.sign({_id: consumer._id, name: consumer.name}, process.env.JWT_SECRET);

                //On sauvegarde le token dans un cookie avec une durée et un nom
                res.cookie('t', token, {expire: new Date() + 9999});

                //On retourne l'utilisateur avec le token
                const {_id, email, name, createdAt} = consumer;
                res.json({token, user: {_id, name, email, createdAt}})

            } else {
                res.status(401).json({error: 'Le mot de passe est incorrect'})
            }
        })
    }
}