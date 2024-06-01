import cartItemModel from "../model/CartItemModel";
import bookModel from "../model/bookModel";

export const createCartItem = async (cartItemID:string,userId:string,bookId:string,qty:number) => {
   const bookDetails = await bookModel.findById(bookId);
   console.log(bookDetails?.qty);
   let total = 0;
   if(bookDetails){
      const checkQty:any = bookDetails.qty - qty;
      if(checkQty < 0) return false;
      //order functionality code .... 
      // total =(Number(bookDetails.price) * Number(qty))
      // if (checkQty == 0) {
      //    bookDetails.status = 'sold out';
      // }else{
      //    bookDetails.status = 'available';
      // }
      // bookDetails.qty = checkQty;
      // await bookModel.findByIdAndUpdate(bookId,bookDetails);
   }
   const newcartitem = new cartItemModel({cartItemID,userId,bookId,qty,total});
   return cartItemModel.insertMany(newcartitem);
};
