import { Router } from 'express';
import express from 'express'; // Import express
import authRouter from './auth/auth.router';
import kycDetailRouter from './kycDetails/kycDetail.router';

export default (): Router => {
  const app = Router();
  app.use(express.json());

  app.use('/auth', authRouter());
  app.use('/kycDetails', kycDetailRouter());

  return app;
};
