import { Request,Response,NextFunction } from "express";
import { createCartItem } from "../services/cartItemServices";
import cartItemModel from "../model/CartItemModel";

export const createCartItemControllre = async (req:any,res:Response,next:NextFunction) => {
    try{
        const {cartItemID,qty} = req.body;
        // const createdBy = Object(req.body.createdBy);
        const userId = (req.userId);
        const bookId = Object(req.body.bookId);
        const cartitem = await createCartItem(cartItemID,userId,bookId,qty);    
        if(cartitem == false) return res.send('book qty is lessar than provided');
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


//Sort By Date newest and oldest criteria ....
export async function sortByDate(req:any,res:any,next:any){
    try{const queryto = {...req.query};
  

    if(queryto.sort == 'newest'){
        var sortData = await cartItemModel.find({}).sort({createdAt:-1});
        res.status(200).json({
            status:"pass",
            SortResult:sortData
        })
    }else if (queryto.sort= 'oldest'){
        var sortData = await cartItemModel.find({}).sort({createdAt:1});
        res.status(200).json({
            status:"pass",
            SortResult:sortData
        })
    }
}catch(err){
        res.status(404).send({
            status:'Fail',
            result:err
        })
    }
}