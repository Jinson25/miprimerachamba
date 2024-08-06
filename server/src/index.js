import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import path from "path"; // Agrega esta línea para importar el módulo 'path'
import express from "express";
import cors from "cors";
import bookRouter from "./routers/book.router.js";
import userRouter from "./routers/user.router.js";
import loanRouter from "./routers/loan.router.js";

import { connectDB } from "./database/database.config.js";
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/biblioteca", bookRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/prestamo", loanRouter);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
  const indexFilePath = path.join(publicFolder, 'index.html');
  res.sendFile(indexFilePath);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Servidor encendido en http://localhost:${PORT}`)
);
