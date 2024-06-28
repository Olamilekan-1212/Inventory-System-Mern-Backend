import express from "express";
import MyProductController from "../controllers/MyProductController";
import multer from "multer";
import { verifyUser } from "../middleware/verifyUser";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/",
  upload.single("imageFile"),
  verifyUser,
  MyProductController.createNewProduct
);

export default router;
