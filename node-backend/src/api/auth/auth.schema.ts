import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  phone: z
    .string()
    .min(13)
    .max(13)
    .regex(/^\+?\d{12}$/),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
  dob: z.string().regex(/^\d{2}-\d{2}-\d{4}$/),
});

export class Signup {
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  dob: string;

  constructor(data: z.infer<typeof signupSchema>) {
    this.email = data.email;
    this.phone = data.phone;
    this.password = data.password;
    this.isVerified = false;
    this.dob = data.dob;
  }
}

export const verifyPhoneSchema = z.object({
  phone: z
    .string()
    .min(13)
    .max(13)
    .regex(/^\+?\d{12}$/),
  otp: z.string().min(6).max(6),
});

export class VerifyPhone {
  phone: string;
  otp: string;

  constructor(data: z.infer<typeof verifyPhoneSchema>) {
    this.phone = data.phone;
    this.otp = data.otp;
  }
}

export const verifyEmailSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
});

export class VerifyEmail {
  email: string;
  otp: string;

  constructor(data: z.infer<typeof verifyEmailSchema>) {
    this.email = data.email;
    this.otp = data.otp;
  }
}

export const forgotPasswordSchema = z.object({
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
});

export class ForgotPassword {
  password: string;
  phone: string;

  constructor(password: string, phone: string) {
    this.password = password;
    this.phone = phone;
  }
}

export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/),
});

export class SignIn {
  email: string;
  password: string;

  constructor(data: z.infer<typeof signInSchema>) {
    this.email = data.email;
    this.password = data.password;
  }
}
