import { addProduct, getAllProducts } from "../controllers/productController"
import { Router } from "express";
const router = Router();
router.get("/getAllProducts", getAllProducts);
router.post("/addProduct", addProduct);

export default router;