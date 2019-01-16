const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const { validationResult } = require('express-validator/check');

const config = require('../../config');
const User = require('../../models/User');

exports.registerUser = async (req, res, next) => {
    try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = await User.create({
        login: req.body.login,
        password: hashedPassword,
        email: req.body.email
    });
    const token = jwt.sign({ userId: user._id }, config.secret, {
        expiresIn: '1h'
    });
    res.status(200).send({ auth: true, token: token, login: user.login });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
    const user = await User.findOne({ login: req.body.login });
    if(!user) {
        const error = new Error('A user with this login could not be found.');
        error.statusCode = 404;
        throw error;
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if(!passwordIsValid) {
        const error = new Error('Wrong password.');
        error.statusCode = 401;
        throw error;
    }
    const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '1h' });

    res.status(200).send({ auth: true, token: token, login: user.login });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

// exports.logoutUser = (req,res) => {
//     res.status(200).send({ auth: false, token: null });
// };