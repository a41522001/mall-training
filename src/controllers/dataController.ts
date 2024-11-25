import { Response, Request } from "express";
const data = "這是成功的資料";
export const getData = (req: Request, res: Response) => {
  res.status(200).json({
    data: data,
    message: "成功取得資料"
  })
}