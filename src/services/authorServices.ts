import authorModel from "../model/authorModel";

export const createAuthor = async (authorID:string,name:string,phone:number,address:string,createdBy:string) => {
   const newauthor = new authorModel({authorID,name,phone,address,createdBy});
   return authorModel.insertMany(newauthor);
};

