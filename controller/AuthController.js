const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const {body, checkSchema, validationResult} = require('express-validator');

let register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });
    try {
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

let login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
        const a=req.t("Email.Email_wrong");
        // if(req.t("Email_wrong")) a=req.t("Email_wrong");
        if (!user) return res.status(401).json(a);

        const hashPassword = cryptoJs.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = hashPassword.toString(cryptoJs.enc.Utf8);
        const inputPassword = req.body.password;
        if (originalPassword !== inputPassword)
            return res.status(401).json(req.t('Password_wrong',{ns:'test1'})); 

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    register: register,
    login: login,
};
