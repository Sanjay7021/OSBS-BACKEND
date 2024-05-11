import { Request,Response,NextFunction } from "express";
import { createCategory } from "../services/categoryServices";
import categoryModel from "../model/categoryModel";

export const createCategoryController = async (req:any,res:Response,next:NextFunction) => {
    try{
        const {categoryID,name} = req.body;
        const createdBy = Object(req.userID);
        const category = await createCategory(categoryID,name,createdBy);    
        console.log(category);
        res.status(201).json(category);
    }catch(err){
        res.status(500).json({error:err});
    }
}

export async function getAllDetailsController(req:Request,res:Response,next:NextFunction){
    const findAll = await categoryModel.find({});
    res.status(200).send(findAll); 
}
