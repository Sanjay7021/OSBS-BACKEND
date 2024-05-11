import express from 'express';
import { createCategoryController } from '../controllers/categoryController';
import { authentication, authorized } from '../middleware/authenticateMiddleware';

const app = express();

const router = express.Router();

router.post('/',authentication,authorized('admin'),createCategoryController);

export default router;