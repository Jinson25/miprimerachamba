import doteven from "dotenv";
doteven.config();

import express from "express";
import cors from "cors";
import bookRouter from "./routers/book.router.js";
import userRouter from "./routers/user.router.js";

import { connectDB } from "./database/database.config.js";
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/biblioteca", bookRouter);
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor encendido en http://localhost:${PORT}`)
);
