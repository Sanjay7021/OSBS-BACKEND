import express from 'express';
import {createAdminController, loginAdmin} from '../controllers/adminController';

const app = express();

const router = express.Router();

router.post('/',createAdminController)
router.post('/login/',loginAdmin);

export default router;