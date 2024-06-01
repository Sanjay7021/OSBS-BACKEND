import express from 'express';
import { createUserController, loginUser, userSummaryController } from '../controllers/userController';
import { authentication, authorized } from '../middleware/authenticateMiddleware';

const app = express();

const router = express.Router();

router.post('/',createUserController)
router.post('/login/',loginUser);
// router.post('/forgotPassword/',forgotPasswordController);
router.post('/resetPassword'); 
router.get('/summary/',authentication,authorized('admin'),userSummaryController)


export default router;