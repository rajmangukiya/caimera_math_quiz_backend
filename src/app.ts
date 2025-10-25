import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router";
import { db } from "./db/config";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Socket } from "./service/socket";
import { Request, Response } from "express";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL?.split(',') || [''],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Server is running" });
});

app.use("/api/v1", router);

const startServer = async () => {
  await db.connect();
  console.log("Database connected");

  Socket.initialize(server);

  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

startServer();