const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const Rejon = require('./models/Rejon');
const Skala = require('./models/Skala');
const Droga = require('./models/Droga');
const Ascent = require('./models/Ascent');
const AuthController = require('./auth/AuthController');

const uri = 'mongodb://Luq:Haslo1@cluster0-shard-00-00-gw1sh.mongodb.net:27017,cluster0-shard-00-01-gw1sh.mongodb.net:27017,cluster0-shard-00-02-gw1sh.mongodb.net:27017/JuraDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(uri, {useNewUrlParser: true}, () => {
    console.log('connected');   
});

const app = express();
const PORT = process.env.PORT || 5000;
const router = express.Router();
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', AuthController);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use((req,res,next) => {
    console.log('Connection');
    next();
});

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

router.route('/ascents/add')
    .post((req,res) => {

        req.body.data.forEach(ascent => {
            const newAscent = new Ascent({
                user: req.body.user,
                rejon: req.body.rejon,
                skala: ascent.skala,
                droga: ascent.droga,
                wycena: ascent.wycena,
                towjaOcena: Number(ascent.ocena),
                styl: ascent.styl,
                date: ascent.date,
                comment: ascent.comment
                });

            newAscent.save()
                .then(result => {
                    res.status(200).send({ message:'Ascent added', result });
                })
                .catch(err => res.status(500).send({ message: 'There was problem registering the ascents.', err }));
        });
    })

app.listen(PORT,  "0.0.0.0", () => {
    console.log(`Server listen at port ${PORT}`);
})