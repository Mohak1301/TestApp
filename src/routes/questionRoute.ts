import { Router } from 'express';
import { createQuestionController, getAllQuestionsController } from '../controllers/questionController';
import { asyncMiddleware } from '../middleware/resolveMiddleware';
import { requireSignIn } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-question',asyncMiddleware(requireSignIn),asyncMiddleware(createQuestionController));

router.get('/get-question',asyncMiddleware(requireSignIn),asyncMiddleware(getAllQuestionsController));


export default router;
