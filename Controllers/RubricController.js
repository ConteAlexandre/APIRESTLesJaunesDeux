const Rubric = require('../Models/RubricModel');

module.exports = {
    createRubric: async (req, res) => {
        const rubricExist = await Rubric.findOne({ title: req.body.title });
        if (rubricExist) return res.status(403).json({ error: "La rubrique existe déjà" });

        const rubric = Rubric(req.body);
        rubric.save()
            .then(rubric => {
                rubric.admin.push(req.profile.adminId);
                res.status(200).json({ message: "Bravo la rubrique a été créée"})
            })
            .catch(err => {
                if (err['errors']['title']) return res.status(401).json({ error: err['errors']['title']['message']});
                if (err['errors']['description']) return res.status(401).json({ error: err['errors']['description']['message']});
            })
    }
}