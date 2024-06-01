import { Request,Response,NextFunction } from "express";
import { book } from "../services/bookServices";
import joi from 'joi';
import bookModel from "../model/bookModel";
import bookAuditModel from "../model/bookAuditModel";




export const createBookController = async (req:any,res:Response,next:NextFunction) => {
    
    const validateSchema = joi.object({
        bookName:joi.string().min(2).max(20).required(),
        // images:joi.string().min(1).max(8).required(),
        status:joi.string().required(),
        edition:joi.number().required(),
        type:joi.string().required(),
        price:joi.number().ruleset.min(0).rule({message: 'Price can not be negative and zero'}).required(),
        qty:joi.number().ruleset.min(1).max(10).rule({message: 'Quntity must be between 1 to 10'}).required(),
        authorID:joi.string().required(),
        categoryID:joi.string().required(),
    }) 
    
    try{
        const {error, value} =  validateSchema.validate(req.body); 
        const {bookName, status,edition,price,qty,type}= req.body;
        let images:any = [];

        for(let i =0;i<req.files.length;i++){
            images.push(req.files[i].path);
        }
        
        const authorID =Object(value.authorID);
        const categoryID =Object(value.categoryID);
        const userID = Object(req.userID);

        if (error) return res.status(400).send(error.details[0].message)
    
        const bookCreated =  await book(bookName,authorID,images,status,edition,price,qty,type,categoryID,userID);    
        console.log(bookCreated);
        res.status(201).json(bookCreated);
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({error:err});
    }
}

export const deleteBookController  = async (req:any,res:any,next:NextFunction) =>{

    try{
        const {id} = req.params;
        const oldData = await bookModel.findById(id);
        if(oldData != null){

        const backupData = new bookAuditModel(oldData);
        bookAuditModel.insertMany(backupData);
        const deletedItem = await bookModel.deleteOne({_id: id});
        res.status(200).send(deletedItem);
        }else{
            res.send("All ready book is deleted")
        }

    }catch(err){
        console.error(err);
        res.send(err);
    }
}

export const updateBookStatus = async (req:any,res:any,next:NextFunction) => {
    const {id} = req.params;
    try{
        const bookData = await bookModel.findByIdAndUpdate(id,{status:'sold out'}).exec();
        res.status(200).send(bookData);
    }catch(err){
        res.status(400).send(err)
    }
}

export const bookSummaryController = async (req:any,res:any,next:NextFunction)=>{
    console.log('inside');
    
    try{
        const data  = await bookModel.find().populate('userID').populate('authorID').populate('categoryID');
        res.status(201).send(data);

    }catch(err){
        res.status(404).send({Error:err});
    }
}

export async function getAllDetailsController(req:Request,res:Response,next:NextFunction){
    const findAll = await bookModel.find({});
    res.status(200).send(findAll); 
}


export const updateBookById = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { bookName,images, status,edition,price,qty,type } = req.body;
        const modifyBy = req.userID;
        const foundData = await bookModel.findById(id);
        if(foundData!= null && foundData.userID == modifyBy){
            const updated = await bookModel.findByIdAndUpdate(id, { bookName,images, status,edition,price,qty,type,modifyBy }, { new: true }).exec();
            res.send(updated);
        }else{
            res.status(401).send('Invalid Access')
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export const aggregationController = async (req:any,res:any,next:any) => {
    try{

        const agrre = await bookModel.aggregate([{
            $match: {
                qty : {$gte : 3},
                status:'available'
            }
            
        },
        {
            $group:{   
                _id:null,
                numOfBooks:{$sum:1}
            }
        },
        {
            $sort:{qty:-1}
        }
    
    ]);

        res.status(200).json({
            status:'Success',
            data:{agrre}
        })

    }catch(err){
        res.status(400).json({
            status:'Failed',
            data:err
        })
    }
}


export const searchingController = async(req:any,res:any,next:any) => {
    try{
        const queryto = {...req.query}
        console.log(queryto.bookName,queryto.price);
        const filter = {"$or": [{"bookName":queryto.bookName},{"price":queryto.price},{"categoryID":queryto.categoryID||undefined}]}
        const searchResult = await bookModel.find(filter)
        // console.log(searchResult);
        
        res.status(200).json({
            status:"Pass",
            result:{searchResult}
        })

    }catch(err){
        res.status(404).json({
            status:"Fail",
            result:err
        })
    }
}

