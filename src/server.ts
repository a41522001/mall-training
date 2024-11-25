import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./routes/authRoute";
import data from "./routes/dataRoute";
import product from "./routes/productRoute";
import cart from "./routes/cartRoute";
import { verifyToken } from "./middlewares/auth";
const app = express();
dotenv.config();
const port = process.env.PORT;
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/user", auth);
app.use("/data", verifyToken, data);
app.use("/product", verifyToken, product);
app.use("/cart", verifyToken, cart);
app.listen(port, () => {
  console.log("listen");
  console.log(port)                                                                     
})