import { Request, Response } from "express";
import cartModel from "../models/cartModel";
import ResponseModel from "../models/responseModel";
import { validationUser } from "../services/validationUser";
export const addCart = async (req: Request, res: Response) => {
  const { ProductID } = req.body;
  if(!ProductID) {
    res.status(401).json(ResponseModel.errorResponse("格式錯誤", 401));
    return;
  }
  const userID = await validationUser(req);
  const result = await cartModel.addCart(ProductID, userID!);
  if(!result) {
    res.status(200).json(ResponseModel.successResponse(null));
  }else {
    res.status(401).json(ResponseModel.errorResponse(result.message, 401));
  }
}
export const gatAllCart = async (req: Request, res: Response) => {
  const userID = await validationUser(req);
  const result = await cartModel.getAllCart(userID!);
  if("message" in result) {
    res.status(401).json(ResponseModel.errorResponse(result.message, 401));
  }else {
    res.status(200).json(ResponseModel.successResponse(result));
  }
}