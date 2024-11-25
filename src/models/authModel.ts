import db from "./database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { createToken } from "../services/createToken";
import { User } from "../types/user";
class AuthModel {
  private async checkUserIsExist(email: string) {
    const query = "SELECT * FROM user WHERE email = ?";
    const [result] = await db.query(query, [email]);
    return result;
  }
  // 註冊
  async signup(name: string, email: string, password: string) {
    const isExist = await this.checkUserIsExist(email);
    if(!Array.isArray(isExist)) {
      return { message: "資料庫錯誤" };
    }
    if(isExist.length !== 0) {
      return { message: "此信箱已被註冊" };
    }
    const id = uuidv4();
    const bcryptPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO user(userID, name, email, password) VALUES(?, ?, ?, ?)";
    try {
      await db.query(query, [id, name, email, bcryptPassword]);
      return { message: "註冊成功" };
    } catch (error) {
      return { message: "格式有誤" };
    }
  }
  // 登入
  async login(userEmail: string, userPassword: string) {
    const query = "SELECT userID, email, password FROM user WHERE email = ?";
    const [result] = await db.query(query, [userEmail]) as [User[], any];
    if(result.length === 0) {
      return { message: "帳號或密碼錯誤" };
    }
    const { userID, email, password } = result[0];
    const isPasswordExist = await bcrypt.compare(userPassword, password);
    if(!isPasswordExist) {
      return { message: "帳號或密碼錯誤" };
    }
    const token = createToken(userID, email);
    return { 
      token,
      message: "登入成功" 
    };
  }
  // token驗證
  async checkUserToken(userID: string, email: string) {
    const query = "SELECT userID, email FROM user WHERE userID = ? AND email = ?";
    const [result] = await db.query(query, [userID, email]) as [User[], any];
    if(result.length === 0) {
      return { message: "無此用戶" };
    }
  }
}
export default new AuthModel();