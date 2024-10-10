import { Router } from 'express';
import { loginController, registerController } from '../controllers/authController';
import { asyncMiddleware } from '../middleware/resolveMiddleware';

const router = Router();

router.post('/register',asyncMiddleware(registerController));
router.post('/login', asyncMiddleware(loginController));

export default router;
