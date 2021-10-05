import { Router } from 'express';
import companyRoutes from './company-routes.js';

const router = Router();

router.use('/company', companyRoutes);

export default router;