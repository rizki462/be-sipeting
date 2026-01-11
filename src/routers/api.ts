import express from "express";
import getAllPosyandu from "../controllers/posyanduController";

const router = express.Router();

router.get("/posyandu", getAllPosyandu);

export default router;
