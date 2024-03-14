import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const emailformSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters." }),
});

const phoneformSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters." }),
});

export default function OtpVerify() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (emailVerified && phoneVerified) {
      router.push("/dashboard");
    }
  }, [emailVerified, phoneVerified, router]);

  const emailform = useForm<z.infer<typeof emailformSchema>>({
    resolver: zodResolver(emailformSchema),
    defaultValues: {
      otp: "",
    },
  });

  const phoneform = useForm<z.infer<typeof phoneformSchema>>({
    resolver: zodResolver(phoneformSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onEmailSubmit = async (values: z.infer<typeof emailformSchema>) => {
    try {
      const response = await fetch("/verifyEmailOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Handle success response
      console.log("Form submitted successfully");
      emailform.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onPhoneSubmit = async (values: z.infer<typeof phoneformSchema>) => {
    try {
      const response = await fetch("/verifyPhoneOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Handle success response
      console.log("Form submitted successfully");
      phoneform.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const onNext = async () => {
    try {
      // Handle success response
      console.log("Form submitted successfully");
      emailform.reset();
      phoneform.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-1/3 mx-auto justify-center min-h-screen">
      <Form {...emailform}>
        <div className="text-center">
          <h1 className="font-bold text-xl">Verify your Email and Phone</h1>
          <p className="text-sm">
            Fill your OTP below to verify your email address and phone number
          </p>
        </div>
        <FormField
          control={emailform.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email OTP</FormLabel>
              <FormControl>
                <Input placeholder="XXXXXX" {...field} />
              </FormControl>
              <p
                onClick={emailform.handleSubmit(onEmailSubmit)}
                className="text-sm font-semibold"
              >
                Resend OTP?
              </p>
              <Button
                onClick={emailform.handleSubmit(onEmailSubmit)}
                className="w-full"
              >
                Verify Email
              </Button>
            </FormItem>
          )}
        />
        <FormMessage />
      </Form>
      <Form {...phoneform}>
        <FormField
          control={phoneform.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone OTP</FormLabel>
              <FormControl>
                <Input placeholder="XXXXXX" {...field} />
              </FormControl>
              <p
                onClick={phoneform.handleSubmit(onPhoneSubmit)}
                className="text-sm font-semibold"
              >
                Resend OTP?
              </p>
              <Button
                onClick={phoneform.handleSubmit(onPhoneSubmit)}
                className="w-full"
              >
                Verify Phone
              </Button>
            </FormItem>
          )}
        />
        <FormMessage />
      </Form>
      <Button
        onClick={onNext}
        className="mt-2"
        disabled={!emailVerified || !phoneVerified}
      >
        Continue to Dashboard
      </Button>
    </div>
  );
}
