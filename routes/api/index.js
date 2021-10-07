import { Router } from 'express';
import companyRoutes from './company-routes.js';
import warehouseRoutes from './warehouse-routes.js';

const router = Router();

router.use('/company', companyRoutes);
router.use('/warehouse', warehouseRoutes);

export default router;