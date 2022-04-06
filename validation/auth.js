const User = require("../models/User");
const loginSchema = {
    password: {
        notEmpty: true,
        errorMessage: "password field cannot be empty",
    },
    email: {
        notEmpty: {
            errorMessage: "email field cannot be empty",
        },
        isLength: {
            options: { min: 0, max: 15 },
            errorMessage: "Username must be at least 6 characters long",
        },
    },
};
const registrationSchema = {
    username: {
        custom: {
            options: (value) => {
                return User.find({
                    username: value,
                }).then((user) => {
                    if (user.length > 0) {
                        return Promise.reject("Username already in use");
                    }
                });
            },
        },
    },
    password: {
        isLength: {
            options: { min: 6, max: 15 },
            errorMessage: "Password must be greater than 6",
        },
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: (value) => {
                return User.find({
                    email: value,
                }).then((user) => {
                    if (user.length > 0) {
                        return Promise.reject("Email address already taken");
                    }
                });
            },
        },
    },
};
module.exports = {
    loginSchema: loginSchema,
    registrationSchema: registrationSchema,
};
