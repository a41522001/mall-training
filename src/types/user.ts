export interface User {
  userID: string;
  email: string;
  password: string;
}
export interface decodedToken {
  _id: string;
  email: string;
  iat: number;
  exp: number;
}