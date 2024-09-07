const usermodel = require("../models/auth.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.registation = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const { name, email, phone } = req.body;

        const user = new usermodel({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            password: hash,
            phone
        });

        const response = await user.save();
        res.status(201).json({
            message: 'Registration successfully done',
            user: response
        });
    } catch (err) {
        res.status(400).json({
            error: err.message || 'Registration failed'
        });
    }
};



exports.login = async (req, res, next) => {
    try {
        const user = await usermodel.findOne({ name: req.body.name });

        if (!user) {
            return res.status(404).json({
                message: 'User name not found'
            });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Password incorrect'
            });
        }

        const token = jwt.sign({
            name: user.name,
            email: user.email,
            phone: user.phone,
        }, 'this is the jwt', {
            expiresIn: '5h'
        });

        res.status(200).json({
            message: 'Login successfully',
            id: user._id,
            name: user.name,
            phone: user.phone,
            token: token
        });
    } catch (error) {
        res.status(400).json({
            error: error.message || 'Login failed'
        });
    }
};
