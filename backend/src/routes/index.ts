import { Router } from 'express';
import authRoutes from './auth.routes';
import internRoutes from './intern.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/intern', internRoutes);
router.use('/admin', adminRoutes);

export default router;