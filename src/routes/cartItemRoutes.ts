import express from 'express';
import { createCartItemControllre } from '../controllers/cartItemController';
import { authentication, authorized } from '../middleware/authenticateMiddleware';

const app = express();

const router = express.Router();

router.post('/',authentication,authorized('user'),createCartItemControllre);

export default router;