import React from 'react';
import UploadAadhaar from './UploadAadhaar';
import UploadPan from './UploadPan';
import UploadPhoto from './UploadPhoto';
import UploadSignature from './UploadSignature';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  dob: z.date(),
  email: z.string().email(),
  incomeRange: z.enum(["<2L", "2-5L", "5-10L", ">10L"]),
  employmentType: z.enum(["Salaried", "Self Employed"]),
  aadhaarNumber: z.string().length(12, {
    message: "Aadhaar Number must be 12 characters.",
  }),
  panCardNumber: z.string().length(10, {
    message: "PAN Card Number must be 10 characters.",
  }),
});

export default function PersonalDetailsForm({ onNextStep }: { onNextStep: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      dob: new Date(),
      email: "",
      incomeRange: "<2L",
      employmentType: "Salaried",
      aadhaarNumber: "",
      panCardNumber: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //   const response = await fetch("/kycDetails", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Failed to submit form");
      //   }

      // Handle success response
      console.log("Form submitted successfully");
      onNextStep();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='space-y-10 py-10 w-8/12'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mx-auto justify-center my-10"
          >
            <div className="flex justify-between w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-[49%]">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-[49%]">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your current address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-[49%]">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <FormField
                control={form.control}
                name="incomeRange"
                render={({ field }) => (
                  <FormItem className="w-[49%]">
                    <FormLabel>Income Range</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your income range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="<2L">Less than 2L</SelectItem>
                        <SelectItem value="2-5L">2-5L</SelectItem>
                        <SelectItem value="5-10L">5-10L</SelectItem>
                        <SelectItem value=">10L">Greater than 10L</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem className="w-[49%]">
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your employment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Salaried">Salaried</SelectItem>
                        <SelectItem value="Self Employed">Self Employed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <FormField
                control={form.control}
                name="aadhaarNumber"
                render={({ field }) => (
                  <FormItem className="w-[49%]">
                    <FormLabel>Aadhaar Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Aadhaar Number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="panCardNumber"
                render={({ field }) => (
                  <FormItem className="w-[49%]">
                    <FormLabel>PAN Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your PAN Number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormMessage />
          </form>
        </Form>


        <div className='flex justify-between'>
          <UploadAadhaar />
          <UploadPan />
        </div>
        <div className='flex justify-between'>
          <UploadPhoto />
          <UploadSignature />
        </div>
        <div>
          <Button className='w-full'>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
