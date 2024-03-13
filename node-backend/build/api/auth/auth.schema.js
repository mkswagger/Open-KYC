"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassword = exports.forgotPasswordSchema = exports.VerifyEmail = exports.verifyEmailSchema = exports.VerifyPhone = exports.verifyPhoneSchema = exports.Signup = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    phone: zod_1.z.number().min(1000000000).max(9999999999).transform((val) => val.toString()),
    password: zod_1.z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
});
class Signup {
    constructor(data) {
        this.email = data.email;
        this.phone = data.phone;
        this.password = data.password;
        this.isVerified = false;
    }
}
exports.Signup = Signup;
exports.verifyPhoneSchema = zod_1.z.object({
    phone: zod_1.z.number().min(1000000000).max(9999999999).transform((val) => val.toString()),
    otp: zod_1.z.number().min(100000).max(999999),
});
class VerifyPhone {
    constructor(data) {
        this.phone = data.phone;
        this.otp = data.otp;
    }
}
exports.VerifyPhone = VerifyPhone;
exports.verifyEmailSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    otp: zod_1.z.number().min(100000).max(999999),
});
class VerifyEmail {
    constructor(data) {
        this.email = data.email;
        this.otp = data.otp;
    }
}
exports.VerifyEmail = VerifyEmail;
exports.forgotPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
});
class ForgotPassword {
    constructor(password, phone) {
        this.password = password;
        this.phone = phone;
    }
}
exports.ForgotPassword = ForgotPassword;
//# sourceMappingURL=auth.schema.js.map