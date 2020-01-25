const Consumer = require('../Models/ConsumerModel');

module.exports = {
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
    }
}