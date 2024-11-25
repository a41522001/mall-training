import { Request, Response, NextFunction } from "express"
import AuthModel from "../models/authModel";
import { decodedToken } from "../types/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      message: "無授權"
    });
    return;
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY!, async (err, decoded) => {
    if(err) {
      console.error("錯誤", err.name);
      if(err.name === "JsonWebTokenError") {
        res.status(400).json({
          message: "無效Token"
        })
        return;
      }
      if(err.name === "TokenExpiredError") {
        res.status(400).json({
          message: "Token已過期"
        })
        return;
      }
      res.status(500).json({
        message: "伺服器錯誤"
      })
      return;
    }
    const { _id, email } = decoded as decodedToken;
    const result = await AuthModel.checkUserToken(_id, email);
    if(!result) {
      next();
    }else {
      res.status(400).json({
        message: result.message
      })
      return;
    }
  });
}