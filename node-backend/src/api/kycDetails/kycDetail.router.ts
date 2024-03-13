import { Router } from 'express';
import { saveKycDetails } from './kycDetail.controller';

export default (): Router => {
  const app = Router();

  app.post('/', saveKycDetails);

  return app;
};
