import { Schema,model } from "mongoose";

const CartItemSchema = new Schema({
    cartItemID:{
        type:String,
        required:[true,'CartItme is required'],
        unique:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    bookId:{
        type:Schema.Types.ObjectId,
        ref:'book_table1'
    },
    qty:{
        type:Number,
        required:[true,'qty is required'],
        min:[1,'Qty can not be less than 1']
    },
    total:{
        type:Number,
        required:[true,'total required']
    },
    createdAt:{
        type:Date,
        default:new Date
    },
    modifyBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
},{timestamps:true});




const cartItemModel= model('cartItem',CartItemSchema);
export default cartItemModel;