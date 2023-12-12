import { Router } from "express";
import { BookModel } from "../interfaces/book.model.js";
import handler from "express-async-handler";
import admin from "../middleware/admin.mid.js";
const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const books = await BookModel.find({});
    res.send(books);
  })
);
router.delete(
  "/",
  admin,
  handler(async (req, res) => {
    // Elimina todos los documentos en la colección de libros
    await BookModel.deleteMany({});

    res.send({
      message: "Todos los libros han sido eliminados correctamente.",
    });
  })
);
router.delete(
  "/:bookId",
  admin,
  handler(async (req, res) => {
    const { bookId } = req.params;
    await BookModel.deleteOne({ _id: bookId });
    res.send({ message: "El libro ha sido eliminado correctamente." });
  })
);

router.get(
  "/search/:searchTerm",
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");

    const books = await BookModel.find({
      $or: [
        { titulo: { $regex: searchRegex } },
        { categoria: { $regex: searchRegex } },
        { autor: { $regex: searchRegex } },
      ],
    });
    res.send(books);
  })
);

router.get(
  "/:bookId",
  handler(async (req, res) => {
    const { bookId } = req.params;
    const book = await BookModel.findOne({ _id: bookId });
    res.send(book);
  })
);

export default router;
