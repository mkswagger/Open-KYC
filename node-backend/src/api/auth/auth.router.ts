import { Router } from 'express';
import { otpSchema, validateRequest } from '../../shared/validator';
import { forgotPasswordSchema, signupSchema, verifyEmailSchema, verifyPhoneSchema } from './auth.schema';
import { forgotPassword, sendOTP, signuUp, verifyEmail, verifyPhone } from './auth.controller';

export default (): Router => {
    const app = Router();

    //TODO: add routes here...
    app.post('/signup', validateRequest('body', signupSchema), signuUp);
    app.post('/verify-phone', validateRequest('body', verifyPhoneSchema), verifyPhone);
    app.post('/verify-email', validateRequest('body', verifyEmailSchema), verifyEmail);
    app.post('/forgot-password/:phone', validateRequest('body', forgotPasswordSchema), forgotPassword);
    app.post('/send-otp', validateRequest('body', otpSchema), sendOTP);

    return app;
};
