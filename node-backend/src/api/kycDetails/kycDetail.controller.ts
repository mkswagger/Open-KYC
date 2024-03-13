import { Request, Response } from 'express';
import { KycDetails } from './kycDetail.schema';
import { handleSaveKycDetails } from './kycDetail.service';

export const saveKycDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const kycDetails = new KycDetails(req.body);
    await handleSaveKycDetails(kycDetails);
    res.status(201).json({ message: 'KYC details saved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
