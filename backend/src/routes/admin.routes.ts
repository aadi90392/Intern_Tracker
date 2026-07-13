import { Router } from 'express';
import { addIntern, getAllTasks } from '../controllers/admin.controller';
import { protect } from '../middlewares/auth.middleware';
import { isAdmin } from '../middlewares/role.middleware';

const router = Router();
router.post('/add-intern', protect, isAdmin, addIntern);
router.get('/all-tasks', protect, isAdmin, getAllTasks);
export default router;