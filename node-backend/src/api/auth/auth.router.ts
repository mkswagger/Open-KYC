import { Router } from 'express';
import { validateRequest } from '../../shared/validator';
import { forgotPasswordSchema, signupSchema, verifyOTPSchema } from './auth.schema';
import { forgotPassword, signuUp, verifyOTP } from './auth.controller';

export default (): Router => {
    const app = Router();

    //TODO: add routes here...
    app.post('/signup', validateRequest('body', signupSchema), signuUp);
    app.post('/verify-otp', validateRequest('body', verifyOTPSchema), verifyOTP);
    app.post('/forgot-password/:phone', validateRequest('body', forgotPasswordSchema), forgotPassword);
    return app;
};
