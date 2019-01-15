const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');

const config = require('../../config');
const User = require('../../models/User');

exports.registerUser = async (req,res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    try {
    const user = await User.create({
        login: req.body.login,
        password: hashedPassword,
        email: req.body.email
    });
    const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
    });
    res.status(200).send({ auth: true, token: token });
    } catch (err) {
        return res.status(500).send('There was problem registering the user.');
    }
};

exports.getUser = async (req,res) => {
    const token = req.headers['x-acces-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided'});
    try {
    const decoded = await jwt.verify(token, config.secret);
        if(!decoded) return res.status(500).send({ auth: false, message: 'Failed to authenticate token'});

    const user = await User.findById(decoded.id);
            
        if(!user) return res.status(404).send('No user found');
        
    res.status(200).send(user);
    } catch (err) {
         return res.status(500).send('There was a problem finding the user.');
    }  
};

exports.loginUser = async (req,res) => {
    try {
    const user = await User.findOne({ login: req.body.login });
        if(!user) return res.status(404).send('No user found.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token });
    } catch (err) {
         return res.status(500).send('Error on the sever.');
    }
};

exports.logoutUser = (req,res) => {
    res.status(200).send({ auth: false, token: null });
};
