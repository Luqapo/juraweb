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

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });
        res.json({ auth: true, token: token });
    });
});

router.get('/me', (req,res) => {
    const token = req.headers['x-acces-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided'});

    jwt.verify(token, config.secret, (err,decoded) => {
        if(err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token'});

        User.findById(decoded.id, { password: 0 }, (err, user) => {
            if (err) return res.status(500).send('There was a problem finding the user.');
            if(!user) return res.status(404).send('No user found');
        
            res.status(200).json(user);
        });
    });
});

router.post('/login', (req,res) => {
    User.findOne({ login: req.body.login }, (err,user) => {
        if(err) return res.status(500).send('Error on the sever.');
        if(!user) return res.status(404).send('No user found.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });

        res.json({ auth: true, token: token });
    });
});

router.get('/logout', (req,res) => {
    res.json({ auth: false, token: null });
});

module.exports = router;