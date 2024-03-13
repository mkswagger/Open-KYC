import { Request, Response } from "express";
import { Signup } from "./auth.schema";
import { handleForgotPassword, handleSignUp } from "./auth.service";

export const signuUp = async (req: Request, res: Response) => {
    try {
        const signup = new Signup(req.body);
        await handleSignUp(signup);
        res.status(201).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const verifyOTP = async (req: Request, res: Response) => { };

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const { phone } = req.params;
        await handleForgotPassword({ phone, password });
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};