abstract class QuestionGenerator {
    public abstract generateQuestionAndAnswer(): Promise<{ question: string, answer: string }>;
}

// this is a random question generator from given range and operator
class RandomQuestionGenerator extends QuestionGenerator {
    private lowestNumber: number;
    private highestNumber: number;
    private operator: string[];

    constructor() {
        super();
        this.lowestNumber = 1;
        this.highestNumber = 999;
        this.operator = ["+", "-", "*", "/"];
    }

    private generateRandomNumber(firstNumber: number, secondNumber: number): number {
        return Math.floor(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;
    }

    public async generateQuestionAndAnswer(): Promise<{ question: string, answer: string }> {
        const operator = this.operator[this.generateRandomNumber(0, this.operator.length - 1) ];
        const firstNumber = this.generateRandomNumber(this.lowestNumber, this.highestNumber);
        const secondNumber = this.generateRandomNumber(this.lowestNumber, this.highestNumber);
        const question = `${firstNumber} ${operator} ${secondNumber}`;

        const answer = eval(question).toFixed(2);
        return Promise.resolve({ question, answer });
    }
}

// AI Question Generator can be implemented here

export { RandomQuestionGenerator };