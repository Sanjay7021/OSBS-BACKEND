import adminModel from "../model/adminModel";
import { createDepartment } from "../services/adminServieces";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcrypt';

export const createAdminController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("inside");

        const { email, password } = req.body;

        const admin = await createDepartment(email, password);
        console.log("ehll" + admin);
        res.status(201).json(admin);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

//Login api

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const foundData = await adminModel.find({ "email": email });
        console.log(foundData);

        if (foundData.length != 0) {

            const validPassword = await bcrypt.compare(password, foundData[0].password)

            if (!validPassword) {
                res.status(400).send('Invalid Password');
                return;
            }

            if (!process.env.SECRET_KEY) {
                res.send("secret key not defined");
                return;
            }

            console.log("login", String(foundData[0]._id));
            const payload = {
                "userType": "admin",
                "userID": foundData[0]._id
            }
            const token = jwt.sign(
                payload, process.env.SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: '10m'
            }
            )
            res.send(`Welcome: Admin, Yours Token: ${token} . Enjoy your private services...`);

        } else {
            res.status(404).send("Invalid UserID and Password")
        }
    } catch (err) {
        console.error(err)
    }
}