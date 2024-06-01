import {Schema, model} from 'mongoose';

const authorSchema = new Schema({
    authorID: 
    {
        type:String,
        required:[true,'author id is required']
    },
    name:{
        type:String,
        required:[true,'auther name is required'],
        unique:[true,'author name must be unique']
    },
    phone:{
        type:Number,
        required:[true,'phone is required'],
        unique:[true,'Phone no must be unique'],
        validate:{
            validator: function (v:any){
                return /[0-9]{10}/.test(v);
            },
            message:(props:{value:String})=> 'Phone no must be 10 digits long'
        }
    },
    address:{
        type:String,
        required:[true,'Address is required'],
    },
    createdAt:{
        type:Date,
        default:new Date
    },
    modifyBy:{
        type:Schema.Types.ObjectId,
        ref:'admin'
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'admin'
    }

},{timestamps:true});



const authorModel = model('author',authorSchema);
export default authorModel;