const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt = require('jsonwebtoken');
const AuthController = require('../controller/AuthController');

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

module.exports = router;
