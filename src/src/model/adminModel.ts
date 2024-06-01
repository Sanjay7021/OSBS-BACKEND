import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const adminSchema = new Schema({
    
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validate: {
            validator : function (v:string) {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
            },
            message: (props:{value:string})=> 'incorrect email id'
        }
    },
    password:{
        type:String,
        required:[true, 'name is required']
    },
    createdAt:{
        type:Date,
        required:[true,'please set created date'],
        default:new Date
    }

},{timestamps:true});



const adminModel = model('admin',adminSchema);
export default adminModel;