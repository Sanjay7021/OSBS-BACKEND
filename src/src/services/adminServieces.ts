import adminModel from "../model/adminModel"
import bcrypt from 'bcrypt';


export const createDepartment = async (email:string, password: string) => {

   const admin =  new adminModel({email,password});

   const salt = await bcrypt.genSalt(10);

   admin.password = await bcrypt.hash(admin.password,salt);

   console.log("admin",admin);
   
   return  adminModel.insertMany(admin);
};
