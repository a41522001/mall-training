import { Request } from "express";
import AuthModel from "../models/authModel";
import { decodedToken } from "../types/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validationUser = async(req: Request) => {
  const autoHeader = req.headers["authorization"];
  const token = autoHeader?.split(" ")[1]!;
  const id = jwt.verify(token, process.env.SECRET_KEY!, async (err, decoded) => {
    const { _id } = decoded as decodedToken;
    return _id;
  })
  return id;
}