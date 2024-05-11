import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const productSchema = new Schema({
    title:{},
    createdAt: Date,
    updatedAt: Date
});

const Blog = model('product',productSchema);
export default Blog;
