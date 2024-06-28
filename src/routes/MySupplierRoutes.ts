import express from "express";
import MySupplierController from "../controllers/MySupplierController";

const router = express.Router();

router.post("/", MySupplierController.createMySupplier);

export default router;
