import express from 'express';
import { createAuthorController,updateAuthorById } from '../controllers/authorController';
import { authentication, authorized } from '../middleware/authenticateMiddleware';

const app = express();

const router = express.Router();

router.post('/',authentication,authorized('admin'),createAuthorController);
router.put('/:id',authentication,authorized('admin'),updateAuthorById)

export default router;