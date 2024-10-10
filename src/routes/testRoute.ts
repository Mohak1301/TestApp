import { Router } from 'express';
import { createTestController, getTestByIdController, getTestsController, permanentDeleteTestController, retrieveDeletedTestController, softDeleteTestController, updateTestController } from '../controllers/testController';
import { asyncMiddleware } from '../middleware/resolveMiddleware';
import { requireSignIn } from '../middleware/authMiddleware';

const router = Router();

router.post('/create-test',asyncMiddleware(requireSignIn),asyncMiddleware(createTestController))
router.get('/get-test',asyncMiddleware(requireSignIn),asyncMiddleware(getTestsController))
router.get('/get-testById/:id',asyncMiddleware(requireSignIn),asyncMiddleware(getTestByIdController))
router.patch('/update-test/:id',asyncMiddleware(requireSignIn),asyncMiddleware(updateTestController))
router.delete('/softDelete-test/:id',asyncMiddleware(requireSignIn),asyncMiddleware(softDeleteTestController))
router.delete('/permanentDelete-test/:id',asyncMiddleware(requireSignIn),asyncMiddleware(permanentDeleteTestController))
router.patch('/retrieve-test/:id',asyncMiddleware(requireSignIn),asyncMiddleware(retrieveDeletedTestController))

export default router;
