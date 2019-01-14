const express = require('express');

const Rejon = require('../models/Rejon');
const Skala = require('../models/Skala');
const Droga = require('../models/Droga');
const Ascent = require('../models/Ascent');

const router = express.Router();

router.route('/regiony/:region_id')
    .get((req,res) => {
        Rejon.find({region: req.params.region_id})
            .then(rejony => {
                res.json(rejony);
            })
            .catch(err => console.log(err));
    })

router.route('/rejony/:rejon_id')
    .get((req,res) => {
        Skala.find({rejon: req.params.rejon_id})
            .then(skaly => {
                res.json(skaly);
            })
            .catch(err => console.log(err));
    })

router.route('/skaly/:skala_id')
    .get((req,res) => {
        Droga.find({skala: req.params.skala_id})
            .then(routes => {
                res.json(routes);
            })
            .catch(err => console.log(err));
    })

router.route('/ascents/:user')
    .get((req,res) => {
        Ascent.find({user: req.params.user})
            .then(ascents => {
                res.json(ascents);
            })
            .catch(err => console.log(err));
    })

router.route('/droga/add')
    .post((req,res) => {
        Droga.create({
            skala: req.body.skala,
            droga: req.body.droga,
            wycena: req.body.wycena,
            przejscia: req.body.przejscia,
            ocena: req.body.ocena
        }, (err, droga) => {
            if(err) return res.status(500).send('There was problem registering the droga.')

            res.status(200).send({ message:'Route added', droga});
        })
    })

router.route('/search')
    .post((req,res) => {
        Droga.find({ droga: req.body.search },(err, result) => {
            if(err) return res.send(err);
            if(result.length > 0){
            Skala.find({skala: result[0].skala},(err, skala) => {
                if(err) return res.send(err);
                Rejon.find({rejon: skala[0].rejon},(err,rejon) => {
                    if(err) return res.send(err);
                    res.json({
                        'region': rejon[0].region, 
                        'rejon': rejon[0].rejon, 
                        'skala': skala[0].skala, 
                        'droga': result[0].droga
                    })
                })
            }) 
        } else {
            res.send({message: 'Nie znaleziono'})
        }
        });
        
    })

router.route('/ascents/add')
    .post((req,res) => {
            const newAscent = new Ascent({
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

            newAscent.save()
                .then(result => {
                    console.log('Ascents added');
                })
                .catch(err => console.log(err));
                res.send({ message:'Ascent added' })
         });

module.exports = router;