import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import MyUserRoute from "./routes/MyUserRoutes";
import MyProductRoute from "./routes/MyProductRoutes";
import MySupplierRoute from "./routes/MySupplierRoutes";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
const PORT = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("test from olamilekan-1212")
const app = express();
app.use(express.json());
// const allowedOrigins = ["http://example1.com", "http://example2.com"];

// const corsOptions: cors.CorsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log(`connected to the database`);
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/my/users", MyUserRoute);
app.use("/api/my/products", MyProductRoute);
app.use("/api/my/suppliers", MySupplierRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
