import cartItemModel from "../model/CartItemModel";

export const createCartItem = async (cartItemID:string,userId:string,bookId:string,qty:number,total:number,createdBy:string) => {
   const newcartitem = new cartItemModel({cartItemID,userId,bookId,qty,total,createdBy});
   return cartItemModel.insertMany(newcartitem);
};
