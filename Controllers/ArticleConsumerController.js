const ArticleConsumer = require('../Models/ArticleConsumerModel');

module.exports = {
    createArticleConsumer: async (req, res) => {
        const exist = await ArticleConsumer.findOne({ title: req.body.title });
        if (exist) return res.status(403).json({ error: "Ce titre existe déjà"});

        const articleConsumer = ArticleConsumer(req.body);
        articleConsumer.save()
            .then(articleConsumer => {
                res.status(200).json({ message: "Votre article a été créé"})
            })
            .catch(err => {
                if (err['errors']['title']) return res.status(401).json({ error: err['errors']['title']['message']});
                if (err['errors']['content']) return res.status(401).josn({ error: err['errors']['content']['message']});
            })
    }
}