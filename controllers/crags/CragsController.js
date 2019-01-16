const { validationResult } = require('express-validator/check');

const Rejon = require('../../models/Rejon');
const Skala = require('../../models/Skala');
const Droga = require('../../models/Droga');

exports.getRejony = async (req, res, next) => {
    try {
    const rejony = await Rejon.find({region: req.params.region_id})
    res.json(rejony);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getSkaly = async (req, res, next) => {
    try {
    const skaly = await Skala.find({rejon: req.params.rejon_id})
    res.json(skaly);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getRoutes = async (req, res, next) => {
    try {
    const routes = await Droga.find({skala: req.params.skala_id});        
    res.json(routes);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addRoute = async (req, res, next) => {
    try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const droga = await Droga.create({
            skala: req.body.skala,
            droga: req.body.droga,
            wycena: req.body.wycena,
            przejscia: req.body.przejscia,
            ocena: req.body.ocena
        });
    res.status(200).send({ message:'Route added', droga});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.searchRoute = async (req, res, next) => {
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
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }  
}