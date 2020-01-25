const Admin = require('../Models/AdminModel');

module.exports = {
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
                if (err['errors']['firstname']) return res.status(401).json({ error1: err['errors']['firstname']['message']});
                if (err['errors']['lastname']) return res.status(401).json({ error2: err['errors']['lastname']['message']});
                if (err['errors']['username']) return res.status(401).json({ error3: err['errors']['username']['message']});
                if (err['errors']['email']) return res.status(401).json({ error4: err['errors']['email']['message']});
                if (err['errors']['hashed_password']) return res.status(401).json({ error5: err['errors']['hashed_password']['message']});
            })
    }
}