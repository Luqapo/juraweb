const Rejon = require('../../models/Rejon');
const Skala = require('../../models/Skala');
const Droga = require('../../models/Droga');

exports.getRejony = async (req,res) => {
    try {
    const rejony = await Rejon.find({region: req.params.region_id})
    res.json(rejony);
    } catch (err) {
        res.status(500).send('There was problem fetching rejony.');
    }
}

exports.getSkaly = async (req,res) => {
    try {
    const skaly = await Skala.find({rejon: req.params.rejon_id})
    res.json(skaly);
    } catch (err) {
        res.status(500).send('There was problem fetching skaly.');
    }
}

exports.getRoutes = async (req,res) => {
    try {
    const routes = await Droga.find({skala: req.params.skala_id});        
    res.json(routes);
    } catch (err) {
        res.status(500).send('There was problem fetching routes.');
    }
}

exports.addRoute = async (req,res) => {
    try {
    const droga = await Droga.create({
            skala: req.body.skala,
            droga: req.body.droga,
            wycena: req.body.wycena,
            przejscia: req.body.przejscia,
            ocena: req.body.ocena
        });
    res.status(200).send({ message:'Route added', droga});
    } catch (err) {
        res.status(500).send('There was problem registering the droga.');
    }
}

exports.searchRoute = async (req,res) => {
    try {
    const result = await Droga.find({ droga: req.body.search });
    if(result.length === 0){
        return res.send({message: 'Nie znaleziono'});
    }
    const skala = await Skala.find({skala: result[0].skala});
    const rejon = await Rejon.find({rejon: skala[0].rejon});
                    
    res.json({
        'region': rejon[0].region, 
        'rejon': rejon[0].rejon, 
        'skala': skala[0].skala, 
        'droga': result[0].droga
    });
    } catch (err) {
        res.status(500).send('There was problem on the server.')
    }  
}