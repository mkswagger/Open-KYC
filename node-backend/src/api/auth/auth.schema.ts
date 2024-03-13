import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    phone: z.number().min(1000000000).max(9999999999).transform((val) => val.toString()),
    password: z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
});

export class Signup {
    email: string;
    phone: string;
    password: string;
    isVerified: boolean;

    constructor(data: z.infer<typeof signupSchema>) {
        this.email = data.email;
        this.phone = data.phone;
        this.password = data.password;
        this.isVerified = false;
    }
}

export const verifyOTPSchema = z.object({
    phone: z.number().min(1000000000).max(9999999999).transform((val) => val.toString()),
    otp: z.number().min(100000).max(999999),
});

export class VerifyOTP {
    phone: string;
    otp: number;

    constructor(data: z.infer<typeof verifyOTPSchema>) {
        this.phone = data.phone;
        this.otp = data.otp;
    }
}

export const forgotPasswordSchema = z.object({
    password: z.string().min(8).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
});

export class ForgotPassword {
    password: string;
    phone: string;

    constructor(password: string, phone: string) {
        this.password = password;
        this.phone = phone;
    }
}


