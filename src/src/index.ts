import express from 'express';
import 'dotenv/config';
import connectDB from './config/database';
import adminRoutes from './routes/adminRoutes';
import authorRoutes from './routes/authorRoutes';
import cartItemRoutes from './routes/cartItemRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import multer from 'multer';
import bodyParser from 'body-parser';

const multerStorage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, "uploads/");
    },
    filename: (req: any, file: any, cb: any) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${Date.now()}.${ext}`);
    },
});


const multerFilter: any = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        console.log('only image can be uploaded on server');

        // res.send("You can upload only images");
        return;
    }
}
//   { dest: 'uploads/' }

const upload = multer({ storage: multerStorage, fileFilter: multerFilter })
const app = express();


connectDB();
app.get('/', function (req, res, next) {
    res.send('welcome to Online second-hand book buying and selling portal');
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(upload.array('images'))
app.use('/admin/', adminRoutes);
app.use('/author/', authorRoutes);
app.use('/cartitem/', cartItemRoutes);
app.use('/category/', categoryRoutes);
app.use('/user/', userRoutes);
app.use('/book/', bookRoutes);

export default app;