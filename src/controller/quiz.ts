import { Request, Response } from "express";
import { Quiz } from "../service/quiz/question";
import { Socket } from "../service/socket";
import userQuery from "../db/query/user";

const checkAnswer = async (req: Request, res: Response) => {
  try {  
    console.log('checkAnswer');
    
    const { answer } = req.body;

    const quiz = Quiz.getInstance();

    // concurrent users handling
    const { isCorrect, reason } = quiz.checkAnswer(answer);
    console.log('reason', reason);
    
    if (!isCorrect) {
      return res.status(200).json({ message: "Answer is incorrect", isCorrect: false });
    }

    const io = Socket.getInstance();
    if (io) {
      await io.emitQuestionToAll();
    }
    await userQuery.updateScore(req.cookies.id, 10);

    return res.status(200).json({ message: "Answer is correct", isCorrect: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to check answer" });
  }
};

export default { checkAnswer };