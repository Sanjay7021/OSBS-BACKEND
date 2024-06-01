import express from 'express';
import { createCartItemControllre, sortByDate } from '../controllers/cartItemController';
import { authentication, authorized } from '../middleware/authenticateMiddleware';

const app = express();

const router = express.Router();

router.post('/',authentication,authorized('user'),createCartItemControllre);
router.get('/sort/',authentication,authorized('user'),sortByDate);

export default router;