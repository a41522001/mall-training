import { addCart, gatAllCart } from "../controllers/cartController";
import { Router } from "express";
const router = Router();

router.post("/addCart", addCart);
router.get("/gatAllCart", gatAllCart);

export default router;

