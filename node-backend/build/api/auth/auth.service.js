"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleForgotPassword = exports.handleVerifyOTP = exports.handleSignUp = void 0;
const database_1 = __importDefault(require("../../loaders/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleSignUp = async (data) => {
    const userCollection = await (await (0, database_1.default)()).collection('user');
    const user = await userCollection.findOne({ email: data.email });
    const saltRounds = 10;
    const hash = await bcrypt_1.default.hash(data.password, saltRounds);
    await userCollection.insertOne({
        email: data.email,
        phone: data.phone,
        password: hash,
        isVerified: false
    });
};
exports.handleSignUp = handleSignUp;
const handleVerifyOTP = async (data) => {
    //TODO: implement this function
};
exports.handleVerifyOTP = handleVerifyOTP;
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
//# sourceMappingURL=auth.service.js.map