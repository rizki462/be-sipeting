import express from "express";
import authController from "../controllers/auth.controller";
import getAllPosyandu from "../controllers/posyanduController";
import generateRecipe from "../controllers/recipeController";

const router = express.Router();

router.get("/posyandu", getAllPosyandu);
router.post("/auth/login", authController.login)
router.post("/generate-recipe", generateRecipe);

export default router;
