import database from "../../loaders/database";
import { ForgotPassword, Signup } from "./auth.schema";
import bcrypt from 'bcrypt';

export const handleSignUp = async (data: Signup) => {
    const userCollection = await (await database()).collection('user');
    const user = await userCollection.findOne({ email: data.email });
    if (user) {
        throw new Error('User already exists');
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(data.password, saltRounds);
    await userCollection.insertOne(
        {
            email: data.email,
            phone: data.phone,
            password: hash,
            isVerified: false
        }
    );
};

export const handleVerifyOTP = async () => { };

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