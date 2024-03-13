"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = require("../../shared/validator");
const auth_schema_1 = require("./auth.schema");
const auth_controller_1 = require("./auth.controller");
exports.default = () => {
    const app = (0, express_1.Router)();
    //TODO: add routes here...
    app.post('/signup', (0, validator_1.validateRequest)('body', auth_schema_1.signupSchema), auth_controller_1.signuUp);
    app.post('/verify-otp', (0, validator_1.validateRequest)('body', auth_schema_1.verifyOTPSchema), auth_controller_1.verifyOTP);
    app.post('/forgot-password/:phone', (0, validator_1.validateRequest)('body', auth_schema_1.forgotPasswordSchema), auth_controller_1.forgotPassword);
    return app;
};
//# sourceMappingURL=auth.router.js.map