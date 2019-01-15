const Ascent = require('../../models/Ascent');

exports.getAscents = async (req, res, next) => {
    try {
        const ascents = await Ascent.find({user: req.params.user});
        res.json(ascents);
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
};

exports.postAscent = async (req, res, next) => {
    try {
        const ascent = await Ascent.create({
                user: req.body.user,
                rejon: req.body.rejon,
                skala: req.body.data.skala,
                droga: req.body.data.droga,
                wycena: req.body.data.wycena,
                towjaOcena: Number(req.body.data.ocena),
                styl: req.body.data.styl,
                date: req.body.data.date,
                comment: req.body.data.comment
                });
        res.send({ message:'Ascent added' });
    } catch (err) {
        if(err) return res.status(500).send('There was problem creating ascent.');
    }
};