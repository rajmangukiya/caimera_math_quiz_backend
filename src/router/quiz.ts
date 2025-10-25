import express from "express";
import quizController from "../controller/quiz";

const router = express.Router();

router.patch("/check-answer", quizController.checkAnswer);

export default router;