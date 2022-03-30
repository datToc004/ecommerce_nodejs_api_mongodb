const cryptoJs = require("crypto-js");
const User = require("../models/User");

let updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = cryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.send(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

let deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};
let showUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
};
let showAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};


module.exports = {
    updateUser: updateUser,
    showAllUser: showAllUser,
    showUser: showUser,
    deleteUser: deleteUser,
};
