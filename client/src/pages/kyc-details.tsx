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
  incomeRange: z.enum(["<2L", "2-5L", "5-10L", ">10L"]),
  employmentType: z.enum(["Salaried", "Self Employed"]),
  aadhaarNumber: z.string().length(12, {
    message: "Aadhaar Number must be 12 characters.",
  }),
  panCardNumber: z.string().length(10, {
    message: "PAN Card Number must be 10 characters.",
  }),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      dob: new Date(),
      incomeRange: "<2L",
      employmentType: "Salaried",
      aadhaarNumber: "",
      panCardNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => console.log(values);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-1/3 mx-auto justify-center min-h-screen"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
                        !field.value && "text-muted-foreground",
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
          name="incomeRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an income range" />
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
            <FormItem>
              <FormLabel>Employment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employment type" />
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
        <FormField
          control={form.control}
          name="aadhaarNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhaar Number</FormLabel>
              <FormControl>
                <Input placeholder="Aadhaar Number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="panCardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Card Number</FormLabel>
              <FormControl>
                <Input placeholder="PAN Card Number" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
