import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT;
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.listen(port, () => {
  console.log("listen");                                                                       
})