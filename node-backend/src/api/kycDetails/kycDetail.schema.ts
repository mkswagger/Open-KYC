import { z } from 'zod';

export const kycDetailsSchema = z.object({
  name: z.string(),
  address: z.string(),
  dob: z.string(), // Assuming date is in string format
  incomeRange: z.string(), // Assuming income range is in string format
  employmentType: z.string(), // Assuming employment type is in string format
  aadhaarNumber: z.string(),
  panCardNumber: z.string(),
  aadhaarCard: z.string(),
  panCard: z.string(),
  signature: z.string(),
});

export class KycDetails {
  name: string;
  address: string;
  dob: string;
  incomeRange: string;
  employmentType: string;
  aadhaarNumber: string;
  panCardNumber: string;
  aadhaarCard: string;
  panCard: string;
  signature: string;

  constructor(data: z.infer<typeof kycDetailsSchema>) {
    this.name = data.name;
    this.address = data.address;
    this.dob = data.dob;
    this.incomeRange = data.incomeRange;
    this.employmentType = data.employmentType;
    this.aadhaarNumber = data.aadhaarNumber;
    this.panCardNumber = data.panCardNumber;
    this.aadhaarCard = data.aadhaarCard;
    this.panCard = data.panCard;
    this.signature = data.signature;
  }
}
