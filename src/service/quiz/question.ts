import { RandomQuestionGenerator } from "./questionGenerator";
import Lock from "../lock/Lock";

// Singleton pattern
class Quiz {
    private static instance: Quiz;
    private questionGenerator: RandomQuestionGenerator;
    private question: {
        question: string;
        answer: string;
    } | null;

    private constructor() {
        this.questionGenerator = new RandomQuestionGenerator();
        this.question = null;
    }

    public static getInstance(): Quiz {
        if (!Quiz.instance) {
            Quiz.instance = new Quiz();
        }
        return Quiz.instance;
    }

    public async getQuestion(): Promise<string> {
        if (!this.question) {
            const { question, answer } = await this.questionGenerator.generateQuestionAndAnswer();
            this.question = { question, answer };
        }
        return this.question?.question ?? "";   
    }

    public checkAnswer(answer: string): {
        isCorrect: boolean;
        reason: string;
    } {
        if (!this.question) {
            return { isCorrect: false, reason: "No question found" };
        }
        const userAnswerNum = Number(answer);
        const correctAnswerNum = Number(this.question.answer);
        if (!isNaN(userAnswerNum) && !isNaN(correctAnswerNum) && userAnswerNum === correctAnswerNum) {
            this.removeQuestion();
            const lock = Lock.getInstance();
            const isSuccess = lock.lock();
            if (!isSuccess) {
                return { isCorrect: false, reason: "Lock not acquired" };
            }
            
            return { isCorrect: true, reason: "Answer is correct" };
        }
        console.log('correct answer', correctAnswerNum, 'user answer', userAnswerNum);
        return { isCorrect: false, reason: "Answer is incorrect" };
    }

    public removeQuestion() {
        this.question = null;
    }
}

export { Quiz };