import { Request,Response,NextFunction } from "express";
import { createCartItem } from "../services/cartItemServices";
import cartItemModel from "../model/CartItemModel";

export const createCartItemControllre = async (req:any,res:Response,next:NextFunction) => {
    try{
        const {cartItemID,qty,total} = req.body;
        const createdBy = Object(req.body.createdBy);
        const userId = Object(req.userId);
        const bookId = Object(req.body.bookId);
        const cartitem = await createCartItem(cartItemID,userId,bookId,qty,total,createdBy);    
        console.log(cartitem);
        res.status(201).json(cartitem);
    }catch(err){
        res.status(500).json({error:err});
    }
}

export async function getAllDetailsController(req:Request,res:Response,next:NextFunction){
    const findAll = await cartItemModel.find({});
    res.status(200).send(findAll); 
}
