import { Server } from "socket.io";
import { Quiz } from "../quiz/question";

const corsOptions = {
    origin: process.env.FRONTEND_URL?.split(',') || [''],
    methods: ["GET", "POST"],
    credentials: true,
};

// Singleton pattern
class Socket {
    private static instance: Socket;
    private io: Server;

    private constructor(server: any) {
        this.io = new Server(server, { cors: corsOptions });
        
        this.io.on("connection", (socket: any) => {
            socket.on("getQuestion", async (msg: any) => {
                const quiz = Quiz.getInstance()
                const question = await quiz.getQuestion();
                socket.emit("question", question);
            });
        });
    }

    public static initialize(server: any): Socket {
        if (!Socket.instance) {
            Socket.instance = new Socket(server);
        }
        return Socket.instance;
    }

    public static getInstance(): Socket {
        return Socket.instance;
    }
    
    public async emitQuestionToAll() {
        const quiz = Quiz.getInstance()
        const question = await quiz.getQuestion();
        this.io.emit("question", question);
    }
}

export { Socket };