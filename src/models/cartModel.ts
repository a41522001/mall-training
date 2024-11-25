import db from "./database";
class CartModel {
  private async queryProduct(productID: string) {
    const query = "SELECT ProductID FROM product WHERE ProductID = ?";
    const [result] = await db.query(query, [productID]);
    if(Array.isArray(result) && result.length === 0) {
      return false;
    }else {
      return true;
    }
  }
  private async checkCartQuantity(productID: string, userID: string) {
    const query = "SELECT Quantity FROM cart WHERE ProductID = ? AND UserID = ?";
    const [result] = await db.query(query, [productID, userID]) as [{ Quantity: number }[], any];
    if(Array.isArray(result) && result.length === 0) {
      return 0;
    }else {
      return result[0].Quantity
    }
  }
  
  async addCart(productID: string, userID: string) {
    const isProductExist = await this.queryProduct(productID);
    if(!isProductExist) {
      return { message: "商品不存在" };
    }
    const quantity = await this.checkCartQuantity(productID, userID);
    if(quantity === 0) {
      const query = "INSERT INTO cart(Quantity, ProductID, UserID) VALUES(?, ?, ?)";
      await db.query(query, [quantity + 1, productID, userID]);
      return;
    }
    const query = "UPDATE cart SET Quantity = Quantity + 1 WHERE ProductID = ? AND UserID = ?";
    await db.query(query, [productID, userID]);
  }

  async getAllCart(userID: string) {
    const query = 
      `SELECT product.ProductID, product.Name, cart.Quantity 
      FROM cart
      INNER JOIN product ON cart.ProductID = product.ProductID
      WHERE cart.UserID = ?`;
    try {
      const [result] = await db.query(query, [userID]);
      return result;
    } catch (error) {
      return { message: "查詢錯誤" };
    }
  }
}
export default new CartModel();