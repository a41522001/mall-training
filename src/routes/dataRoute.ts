import { getData } from "../controllers/dataController"
import { Router } from "express";
const router = Router();
router.post("/getData", getData);

export default router;