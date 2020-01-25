const ArticleAdmin = require('../Models/ArticleAdminModel');

module.exports = {
    createArticleAdmin: async (req, res) => {
        const exist = await ArticleAdmin.findOne({ title: req.body.title });
        if (exist) return res.status(403).json({ error: "Le titre de cet article existe déjà" })

        const articleAdmin = await ArticleAdmin(req.body);
        articleAdmin.save()
            .then(artcileAdmin => {
                res.status(200).json({ message: "L'article a bien été créé"})
            })
            .catch(err => {
                if (err['errors']['title']) return res.status(401).json({ error: err['errors']['title']['message']});
                if (err['errors']['content']) return res.status(401).json({ error: err['errors']['content']['message']});
            })
    },
    getAllArcticleAdmin: async (req, res) => {
        const articleAdmin = ArticleAdmin.find()
            .then(articleAdmin => {
                res.status(200).json(articleAdmin)
            })
            .catch(err => {
                res.status(404).json({ error: err })
            })
    }
}