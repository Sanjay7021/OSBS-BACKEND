import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const cartSchema = new Schema({
   
    cartItemID:{
        type:Schema.Types.ObjectId,
        ref:'cartItem'
    },
    totalPrice:{
        type:Number,
        required:[true,'Enter calculated total price by qty']
    },
    createdAt:{
        type:Date,
        default:new Date
    },
    updatedAt:{
        type:Date
    },
    modifyBy:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

cartSchema.pre('save', function (next) {
    this.updatedAt = new Date;
})


const cartModel = model('cart',cartSchema);
export default cartModel;