"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSendOTP = exports.handleForgotPassword = exports.handleVerifyEmail = exports.handleVerifyPhone = exports.handleSignUp = void 0;
const database_1 = __importDefault(require("../../loaders/database"));
const sendMail_1 = require("../../shared/sendMail");
const sendPhone_1 = require("../../shared/sendPhone");
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleSignUp = async (data) => {
    const userCollection = await (await (0, database_1.default)()).collection('user');
    const user = await userCollection.findOne({ email: data.email });
    if (user) {
        throw new Error('User already exists');
    }
    const saltRounds = 10;
    const hash = await bcrypt_1.default.hash(data.password, saltRounds);
    const phoneOtp = Math.floor(100000 + Math.random() * 900000);
    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    const otpCollection = await (await (0, database_1.default)()).collection('otp');
    await otpCollection.insertOne({ device: data.phone, otp: phoneOtp, createdAt: new Date() });
    await otpCollection.insertOne({ device: data.email, otp: emailOtp, createdAt: new Date() });
    await (0, sendMail_1.sendMail)(data.email, 'Verify Email', `Your OTP is ${emailOtp}`);
    await (0, sendPhone_1.sendPhone)(data.phone, `Your OTP is ${phoneOtp}`);
    await userCollection.insertOne({
        email: data.email,
        phone: data.phone,
        password: hash,
        isPhoneVerified: false,
        isEmailVerified: false,
    });
};
exports.handleSignUp = handleSignUp;
const handleVerifyPhone = async (data) => {
    const otpCollection = await (await (0, database_1.default)()).collection('otp');
    const otp = await otpCollection.findOne({ device: data.phone });
    if (!otp || otp.otp !== data.otp) {
        throw new Error('Invalid OTP');
    }
    if (new Date().getTime() - otp.createdAt.getTime() > 600000) {
        throw new Error('OTP expired');
    }
    await otpCollection.deleteOne({ device: data.phone });
    const userCollection = await (await (0, database_1.default)()).collection('user');
    await userCollection.findOneAndUpdate({ phone: data.phone }, { $set: { isPhoneVerified: true } });
};
exports.handleVerifyPhone = handleVerifyPhone;
const handleVerifyEmail = async (data) => {
    const otpCollection = await (await (0, database_1.default)()).collection('otp');
    const otp = await otpCollection.findOne({ device: data.email });
    if (!otp || otp.otp !== data.otp) {
        throw new Error('Invalid OTP');
    }
    if (new Date().getTime() - otp.createdAt.getTime() > 600000) {
        throw new Error('OTP expired');
    }
    await otpCollection.deleteOne({ device: data.email });
    const userCollection = await (await (0, database_1.default)()).collection('user');
    await userCollection.findOneAndUpdate({ email: data.email }, { $set: { isEmailVerified: true } });
};
exports.handleVerifyEmail = handleVerifyEmail;
const handleForgotPassword = async (data) => {
    const userCollection = await (await (0, database_1.default)()).collection('user');
    const user = await userCollection.findOne({ phone: data.phone });
    if (!user || !user.isVerified) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt_1.default.compare(data.password, user.password);
    if (isMatch) {
        throw new Error('New password cannot be same as old password');
    }
    const saltRounds = 10;
    const hash = await bcrypt_1.default.hash(data.password, saltRounds);
    await userCollection.findOneAndUpdate({ phone: data.phone }, { $set: { password: hash } });
};
exports.handleForgotPassword = handleForgotPassword;
const handleSendOTP = async (device) => {
    const otpCollection = await (await (0, database_1.default)()).collection('otp');
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (device.includes('@')) {
        await (0, sendMail_1.sendMail)(device, 'Verify Email', `Your OTP is ${otp}`);
    }
    else {
        await (0, sendPhone_1.sendPhone)(device, `Your OTP is ${otp}`);
    }
    await otpCollection.insertOne({ device, otp, createdAt: new Date() });
};
exports.handleSendOTP = handleSendOTP;
//# sourceMappingURL=auth.service.js.map