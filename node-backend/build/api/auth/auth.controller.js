"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.verifyOTP = exports.signuUp = void 0;
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
const signuUp = async (req, res) => {
    try {
        const signup = new auth_schema_1.Signup(req.body);
        await (0, auth_service_1.handleSignUp)(signup);
        res.status(201).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.signuUp = signuUp;
const verifyOTP = async (req, res) => { };
exports.verifyOTP = verifyOTP;
const forgotPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { phone } = req.params;
        await (0, auth_service_1.handleForgotPassword)({ phone, password });
        res.status(200).json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=auth.controller.js.map