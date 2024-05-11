import express from 'express';
import * as bookController from '../controllers/bookController';
import { authentication, authorized } from '../middleware/authenticateMiddleware';


const app = express();

const router = express.Router();

router.post('/',authentication,authorized('user'),bookController.createBookController);
router.delete('/delete/:id',authentication,authorized('user'),bookController.deleteBookController);
router.patch('/:id',authentication,authorized('user'),bookController.updateBookStatus);
router.get('/summary/',authentication,authorized('admin'),bookController.bookSummaryController);
router.get('/viewBooks/',authentication,authorized('admin','user'),bookController.getAllDetailsController);
router.put('/update/:id',authentication,authorized('user'),bookController.updateBookById);
router.get('/aggregate/',bookController.aggregationController);

export default router;