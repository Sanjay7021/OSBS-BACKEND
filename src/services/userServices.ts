import userModel from "../model/userModel";
// import bcrypt from 'bcrypt';

export const createUser = async (userName:string,role:string,email:string,phone:number,address:string,password:string) => {

   
   const newuser = new userModel({userName,role,email,phone,address,password});
   return userModel.insertMany(newuser);
};
