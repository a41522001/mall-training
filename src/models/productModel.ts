import db from "./database";
import { v4 as uuidv4 } from 'uuid';
class ProductModel {
  private async queryProduct(productName: string) {
    const query = "SELECT Name FROM product WHERE Name = ?";
    const [result] = await db.query(query, [productName]);
    if(Array.isArray(result) && result.length === 0) {
      return false;
    }
    return true;
  }
  async getAllProducts() {
    const query = "SELECT * FROM product";
    const [result] = await db.query(query);
    return result;
  }
  async addProduct(name: string, price: number) {
    const isProductExist = await this.queryProduct(name);
    if(isProductExist) {
      return { message: "商品已經存在" };
    }
    const ID = uuidv4();
    const query = 
      `INSERT INTO product(ProductID, Name, Price) VALUES(?, ?, ?)`;
    try {
      await db.query(query, [ID, name, price]);
      const newProduct = {
        name,
        price
      }
      return newProduct;
    } catch (error) {
      console.error(error);
      return { message: "伺服器錯誤" };
    }
  }
}

export default new ProductModel();