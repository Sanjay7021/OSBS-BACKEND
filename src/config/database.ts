import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/osbs').then(result=>{
            console.log('database created');
            
        }).catch(err=>{
            console.log(err);
            
        });
        console.log('MongoDB connected');
    }catch(error){
        console.error('MongoDB connection error',error);
        process.exit(1);
    }
}


export default connectDB;