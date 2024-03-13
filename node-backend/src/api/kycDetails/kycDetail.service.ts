import database from '../../loaders/database';
import { KycDetails } from './kycDetail.schema';

export const handleSaveKycDetails = async (data: KycDetails): Promise<void> => {
  try {
    const kycDetailsCollection = await (await database()).collection('kycDetails');
    await kycDetailsCollection.insertOne(data);
  } catch (error) {
    throw new Error('Failed to save KYC details');
  }
};
