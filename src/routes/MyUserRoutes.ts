import express from "express";
import MyUserController from "../controllers/MyUserController";

const router = express.Router();

router.post("/register", MyUserController.createMyUser);
router.post("/login", MyUserController.loginToAccount);

export default router;
