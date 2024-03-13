"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = exports.forgotPassword = exports.verifyEmail = exports.verifyPhone = exports.signuUp = void 0;
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
const verifyPhone = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        await (0, auth_service_1.handleVerifyPhone)({ phone, otp });
        res.status(200).json({ message: 'Phone number verified successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.verifyPhone = verifyPhone;
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        await (0, auth_service_1.handleVerifyEmail)({ email, otp });
        res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.verifyEmail = verifyEmail;
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
const sendOTP = async (req, res) => {
    try {
        const { device } = req.body;
        await (0, auth_service_1.handleSendOTP)(device);
        res.status(200).json({ message: `OTP sent to ${device}` });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.sendOTP = sendOTP;
//# sourceMappingURL=auth.controller.js.map