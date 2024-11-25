import { Request, Response } from "express";
import ProductModel from "../models/productModel";
import ResponseModel from "../models/responseModel";
export const getAllProducts = async (req: Request, res: Response) => {
  const result = await ProductModel.getAllProducts();
  res.status(200).json(ResponseModel.successResponse(result));
}
export const addProduct = async (req: Request, res: Response) => {
  const { Name, Price } = req.body;
  if(!Name || !Price) {
    res.status(401).json(ResponseModel.errorResponse("格式錯誤", 401));
  }
  const result = await ProductModel.addProduct(Name, Price);
  if("message" in result) {
    res.status(401).json(ResponseModel.errorResponse(result.message, 401));
  }else {
    res.status(200).json(ResponseModel.successResponse(result, "新增成功"));
  }
}