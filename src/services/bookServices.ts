import bookModel from "../model/bookModel";

export const book = async (bookName:string,authorID:string,images:string,status:string,edition:number,price:number,qty:number,type:string,categoryID:string,userID:string) => {
   const book = new bookModel({bookName,authorID,images,status,edition,price,qty,type,categoryID,userID});
   console.log("services",book);
   
   return bookModel.insertMany(book);
};

export const viewAll = async () => {
   const viewData = await bookModel.find({});
   return viewData
}