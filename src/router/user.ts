import express from "express";
import userController from "../controller/user";

const router = express.Router();

router.get("/", userController.getUser);

export default router;