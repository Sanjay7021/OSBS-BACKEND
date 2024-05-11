import categoryModel from "../model/categoryModel"

export const createCategory = async (categoryID:string, name: string, createdBy:string) => {
   const category = new categoryModel({categoryID,name,createdBy});
   return categoryModel.insertMany(category);
};
