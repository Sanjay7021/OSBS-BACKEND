import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookSchema = new Schema({
    bookName: {
        type: String,
        required: [true, 'Book name is required'],
    },
    authorID: {
        type:Schema.Types.ObjectId,
        ref:'author',
        
    },
    images:{
        type:Array,
        required:[true,'insert image']
    },
    status:{
        type:String,
        enum:{
            values:['available','sold out','removed'],
            message:'{VALUE} is not supported'
        },
        required:[true,'status required']
    }
    ,
    edition: {
        type: Number,
        required: [true, 'Edition is required'],
        validate: {
            validator: function (v: any) {
                return /\d/.test(v);
            },
            message: (props: { value: any; }) => `${props.value} is not a number!`
        }
    },
    price:{
        type:Number,
        requred:[true,'Price is requied'],
        validate:{
            validator:function (v :any){
                return /\d/.test(v);
            },
            message: (props:{value: any}) => `${props.value} is not a number!`
        },
        min:[0,'price can not be less than 0']
    },
    qty:{
        type:Number,
        required:[true,'qty is required'],
        min:[1,'Qty can not be less than 1']
    },
    type:{
        type:String,
        required:[true,'type is required'],
        enum: {
            values: ['sell', 'rent'],
            message: '{VALUE} is not supported'
          }
    },
    categoryID:{
        type:Schema.Types.ObjectId,
        ref:'category',
        required:[true,'category is required'],
    },
    userID:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    createdAt:{
        type:Date,
        default :new Date()
    },
    modifyBy:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }

},{timestamps:true});


// bookSchema.pre('save',function (next){
//     this.updatedAt = new Date;
//     next();
// })

// bookSchema.pre('deleteOne',function (next) {
//         console.log("deleted",this.bookName);
        
// })


const bookModel = model('Book_table1', bookSchema);
export default bookModel;
