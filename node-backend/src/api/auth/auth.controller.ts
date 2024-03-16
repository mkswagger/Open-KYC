import { Request, Response } from 'express';
import { Signup } from './auth.schema';
import {
  handleForgotPassword,
  handleSendOTP,
  handleSignIn,
  handleSignUp,
  handleVerifyEmail,
  handleVerifyPhone,
} from './auth.service';

export const signuUp = async (req: Request, res: Response) => {
  try {
    const signup = new Signup(req.body);
    await handleSignUp(signup);
    res.status(201).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyPhone = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;
    await handleVerifyPhone({ phone, otp });
    res.status(200).json({ message: 'Phone number verified successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    await handleVerifyEmail({ email, otp });
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('ERROR', error);
    res.status(400).json({ error: error.message });
  }
};

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

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { device } = req.body;
    await handleSendOTP(device);
    res.status(200).json({ message: `OTP sent to ${device}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await handleSignIn(email, password);
    res.status(200).json({ message: 'Signed in successfully', data: { user } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
