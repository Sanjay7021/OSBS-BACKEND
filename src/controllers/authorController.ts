import { Request, Response, NextFunction } from "express";
import { createAuthor } from "../services/authorServices";
import authorModel from "../model/authorModel";
import joi from 'joi';

export const createAuthorController = async (req: any, res: Response, next: NextFunction) => {
    const schem = joi.object({
        authorID:joi.string().alphanum().required(),
        name: joi.string().alphanum().min(3).max(30).required(),
        userID : joi.string().alphanum().required(),
    })

    try {

        const userID = req.userID;
        const {authorID, name, phone, address} = req.body;
        
        const { error, value } = schem.validate({ authorID,name,userID});

        if (error) return res.status(400).send(error.details[0].message)
       
        const author = await createAuthor(value.authorID, value.name,phone,address, value.userID);
        console.log(author);
        res.status(201).json(author);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export const updateAuthorById = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name,phone,address } = req.body;
        const modifyBy = req.userID;
        const updated = await authorModel.findByIdAndUpdate(id, { name, phone,address,modifyBy }, { new: true }).exec();
        res.send(updated);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

