const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const Rejon = require('./models/Rejon');
const Skala = require('./models/Skala');
const Droga = require('./models/Droga');
const AuthController = require('./auth/AuthController');

const uri = 'mongodb://Luq:Haslo1@cluster0-shard-00-00-gw1sh.mongodb.net:27017,cluster0-shard-00-01-gw1sh.mongodb.net:27017,cluster0-shard-00-02-gw1sh.mongodb.net:27017/JuraDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
mongoose.connect(uri, {useNewUrlParser: true}, () => {
    console.log('connected');
    
});

const app = express();
const PORT = process.env.PORT || 5000;
const router = express.Router();
app.use('/api', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', AuthController);

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
            .then(rejony => {
                res.json(rejony);
            })
            .catch(err => console.log(err));
    })

router.route('/skaly/:skala_id')
    .get((req,res) => {
        console.log(req.params.skala_id);
        Droga.find({skala: req.params.skala_id})
            .then(skaly => {
                res.json(skaly);
            })
            .catch(err => console.log(err));
    })

app.listen(PORT,  "0.0.0.0", () => {
    console.log(`Server listen at port ${PORT}`);
})