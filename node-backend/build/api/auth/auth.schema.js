"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassword = exports.forgotPasswordSchema = exports.VerifyOTP = exports.verifyOTPSchema = exports.Signup = exports.signupSchema = void 0;
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
exports.verifyOTPSchema = zod_1.z.object({
    phone: zod_1.z.number().min(1000000000).max(9999999999).transform((val) => val.toString()),
    otp: zod_1.z.number().min(100000).max(999999),
});
class VerifyOTP {
    constructor(data) {
        this.phone = data.phone;
        this.otp = data.otp;
    }
}
exports.VerifyOTP = VerifyOTP;
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