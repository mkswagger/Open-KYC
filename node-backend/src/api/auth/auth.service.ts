import database from "../../loaders/database";
import { sendMail } from "../../shared/sendMail";
import { sendPhone } from "../../shared/sendPhone";
import { ForgotPassword, Signup, VerifyEmail, VerifyPhone } from "./auth.schema";
import bcrypt from 'bcrypt';

export const handleSignUp = async (data: Signup) => {
    const userCollection = await (await database()).collection('user');
    const user = await userCollection.findOne({ email: data.email });
    if (user) {
        throw new Error('User already exists');
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(data.password, saltRounds);

    const phoneOtp = Math.floor(100000 + Math.random() * 900000);
    const emailOtp = Math.floor(100000 + Math.random() * 900000);
    const otpCollection = await (await database()).collection('otp');
    await otpCollection.insertOne({ device: data.phone, otp: phoneOtp, createdAt: new Date() });
    await otpCollection.insertOne({ device: data.email, otp: emailOtp, createdAt: new Date() });
    await sendMail(data.email, 'Verify Email', `Your OTP is ${emailOtp}`);
    await sendPhone(data.phone, `Your OTP is ${phoneOtp}`);

    await userCollection.insertOne(
        {
            email: data.email,
            phone: data.phone,
            password: hash,
            isPhoneVerified: false,
            isEmailVerified: false,
            dob: data.dob,
        }
    );
};

export const handleVerifyPhone = async (data: VerifyPhone) => {
    const otpCollection = await (await database()).collection('otp');
    const otp = await otpCollection.findOne({ device: data.phone });
    if (!otp || otp.otp !== data.otp) {
        throw new Error('Invalid OTP');
    }
    if (new Date().getTime() - otp.createdAt.getTime() > 600000) {
        throw new Error('OTP expired');
    }
    await otpCollection.deleteOne({ device: data.phone });
    const userCollection = await (await database()).collection('user');
    await userCollection.findOneAndUpdate({ phone: data.phone }, { $set: { isPhoneVerified: true } });
};

export const handleVerifyEmail = async (data: VerifyEmail) => {
    const otpCollection = await (await database()).collection('otp');
    const otp = await otpCollection.findOne({ device: data.email });
    if (!otp || otp.otp !== data.otp) {
        throw new Error('Invalid OTP');
    }
    if (new Date().getTime() - otp.createdAt.getTime() > 600000) {
        throw new Error('OTP expired');
    }
    await otpCollection.deleteOne({ device: data.email });
    const userCollection = await (await database()).collection('user');
    await userCollection.findOneAndUpdate({ email: data.email }, { $set: { isEmailVerified: true } });
};

export const handleForgotPassword = async (data: ForgotPassword) => {
    const userCollection = await (await database()).collection('user');
    const user = await userCollection.findOne({ phone: data.phone });
    if (!user || !user.isVerified) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch) {
        throw new Error('New password cannot be same as old password');
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(data.password, saltRounds);
    await userCollection.findOneAndUpdate({ phone: data.phone }, { $set: { password: hash } });
};

export const handleSendOTP = async (device: string) => {
    const otpCollection = await (await database()).collection('otp');
    const otp = Math.floor(100000 + Math.random() * 900000);
    if (device.includes('@')) {
        await sendMail(device, 'Verify Email', `Your OTP is ${otp}`);
    }
    else {
        await sendPhone(device, `Your OTP is ${otp}`);
    }
    await otpCollection.insertOne({ device, otp, createdAt: new Date() });
};