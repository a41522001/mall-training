import { Response, Request } from "express";
import AuthModel from "../models/authModel";
import ResponseModel from "../models/responseModel";
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) {
    res.status(401).json(ResponseModel.errorResponse("註冊失敗欄位錯誤", 401));
  }else {
    const result = await AuthModel.signup(name, email, password);
    res.status(200).json(ResponseModel.successResponse(null, result.message));
  }
}
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthModel.login(email, password);
  if("token" in result) {
    res.status(200).json(ResponseModel.loginResponse(result.message, result.token!, 100));
  }else {
    res.status(401).json(ResponseModel.errorResponse(result.message, 401));
  }
}