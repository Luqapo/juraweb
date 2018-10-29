const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');

const config = require('../config');
const User = require('../models/User');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req,res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        login: req.body.login,
        password: hashedPassword,
        email: req.body.email
    }, (err, user) => {
        if(err) return res.status(500).send('There was problem registering the user.')

        const token = jwt.sign({ id: user._id }, config.secret);
        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/me', (req,res) => {
    const token = req.headers['x-acces-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided'});

    jwt.verify(token, config.secret, (err,decoded) => {
        if(err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token'});

        res.status(200).send(decoded);
    });
});

module.exports = router;