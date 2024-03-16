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
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-1/3 mx-auto justify-center min-h-screen">
      <Form {...emailform}>
        <FormField
          control={emailform.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email OTP</FormLabel>
              <FormControl>
                <Input placeholder="XXXXXX" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <div className="flex justify-between">
          <Button onClick={emailform.handleSubmit(onEmailSubmit)}>
            Verify
          </Button>
          <Button onClick={emailform.handleSubmit(onEmailSubmit)}>
            Resend OTP
          </Button>
        </div>
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
            </FormItem>
          )}
        />
        <FormMessage />
        <div className="flex justify-between">
          <Button onClick={phoneform.handleSubmit(onPhoneSubmit)}>
            Verify
          </Button>
          <Button onClick={phoneform.handleSubmit(onPhoneSubmit)}>
            Resend OTP
          </Button>
        </div>
      </Form>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
}
