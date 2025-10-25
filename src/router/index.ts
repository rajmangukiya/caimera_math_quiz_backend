import express from "express";
import userRouter from "./user";
import quizRouter from "./quiz";
import auth from "../middlewares/auth";
const router = express.Router();

router.use("/user", userRouter);
router.use("/quiz", auth, quizRouter);

export default router;