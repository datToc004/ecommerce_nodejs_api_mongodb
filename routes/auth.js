const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const AuthController = require("../controller/AuthController");
const { checkSchema } = require("express-validator");
const { loginSchema,registrationSchema } = require("../validation/auth");

router.post("/register",checkSchema(registrationSchema), AuthController.register);

router.post("/login", checkSchema(loginSchema), AuthController.login);

module.exports = router;
