const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const AuthController = require('./auth/AuthController');
const CragsController = require('./crags/CragsController');

const uri = 'mongodb://Luq:Haslo1@cluster0-shard-00-00-gw1sh.mongodb.net:27017,cluster0-shard-00-01-gw1sh.mongodb.net:27017,cluster0-shard-00-02-gw1sh.mongodb.net:27017/JuraDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const PORT = process.env.PORT || 5000;

mongoose.connect(uri, {useNewUrlParser: true}, () => {
    console.log('connected');   
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((req,res,next) => {
    const url = req.url;
    if(url === '/east' || url === '/center' || url === '/north'){
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', AuthController);
app.use('/api', CragsController);

app.listen(PORT,  "0.0.0.0", () => {
    console.log(`Server listen at port ${PORT}`);
})