import express from "express";
import authController from "../controllers/auth.controller";
import getAllPosyandu from "../controllers/posyanduController";

const router = express.Router();

router.get("/posyandu", getAllPosyandu);
router.post("/auth/login", authController.login)

export default router;
