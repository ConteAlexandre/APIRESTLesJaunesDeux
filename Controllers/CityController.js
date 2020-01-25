const City = require('../Models/CityModel');

module.exports = {
    createCity: async (req, res) => {
        const cityExist = await City.findOne({ name: req.body.name });
        if (cityExist) return res.status(403).json({ error: "Cette ville existe déjà" });

        const city = City(req.body);
        city.save()
            .then(city => {
                res.status(200).json({ message: "La ville a bien été créée" })
            })
            .catch(err => {
                if (err['errors']['name']) return res.status(401).json({ error: err['errors']['name']['message']});
                if (err['errors']['code_postal']) return  res.status(401).json({ error: err['errors']['code_postal']['message']});
            })
    },
}