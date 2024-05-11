import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = new Schema({
    categoryID: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    modifyBy: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    }, createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    }
},{timestamps:true});
// categorySchema.pre('save', function (next) {
//     this.updatedAt = new Date;
//     next();
// })

const categoryModel = model('category', categorySchema);
export default categoryModel;