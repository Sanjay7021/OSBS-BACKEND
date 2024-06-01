import { Request, Response, NextFunction } from "express";
import { createUser } from "../services/userServices";
import userModel from "../model/userModel";
import cartItemModel from "../model/CartItemModel";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import cookie from 'cookie';
// import userModel from "../model/userModel";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        var { userName, role, email, phone, address, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const user = await createUser(userName, role, email, phone, address, password);
        console.log(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export const userSummaryController = async (req: any, res: Response, next: NextFunction) => {
    console.log("inside summary controller");

    try {
        const data = await cartItemModel.find().populate('userId');
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
}


export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const foundData = await userModel.find({ "email": email });
        console.log(foundData);

        if (foundData.length != 0) {

            const validPassword = await bcrypt.compare(password, String(foundData[0].password))
            if (!validPassword) {
                res.status(401).send("Invalid Password")
                return;
            }

            if (!process.env.SECRET_KEY) {
                res.send("secret key not defined");
                return;
            }

            // console.log("login", String(foundData[0]._id));
            const payload = {
                "userType": "user",
                "userID": foundData[0]._id
            }
            const token = jwt.sign(
                payload, process.env.SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: '90d'
            }
            )  

            res.cookie('jwt',token,{
                expires:new Date(
                    Date.now() + 90 * 24 * 60 * 60 * 1000
                ),
                httpOnly:true
            })        
            res.send(`Welcome: User, Yours Token: ${token} . Enjoy your private services...`);

        } else {
            res.status(404).send("Invalid UserID and Password")
        }
    } catch (err) {
        console.error(err)
    }
}



//Working on it.....

// export const forgotPasswordController = async (req: any, res: any, next: any) => {

//     try {
//         console.log('inside', req.body.email);

//         //1) get user based on Posted email
//         const user = await userModel.findOne({ "email": req.body.email });
//         console.log(user);

//         //2) generate the randon reset token
//         const resetToken = crypto.randomBytes(32).toString('hex');

//         user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//         user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//         console.log({ resetToken }, user.passwordResetToken);

//         await userModel.updateOne(user);

//         //3) send it to user email


//     } catch (err) {
//         res.status(404).send("There is no user with email address.")
//     }

// }