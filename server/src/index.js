import express from "express";
import cors from "cors";
import bookRouter from "./routers/book.router.js";

const app = express();

app.use(cors());

app.use('/api/v1/biblioteca', bookRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor encendido en http://localhost:${PORT}`));
