import { Router } from "express";
import { BookModel } from "../interfaces/book.model.js";
import handler from "express-async-handler";
import admin from "../middleware/admin.mid.js";
const router = Router();
//obtener todo los libros con metodo GET
router.get(
  "/",
  handler(async (req, res) => {
    const books = await BookModel.find({});
    res.send(books);
  })
);
//obtener un libro por su id
router.get(
  "/:bookId",
  handler(async (req, res) => {
    const { bookId } = req.params;
    const book = await BookModel.findOne({ _id: bookId });
    res.send(book);
  })
);

// Elimina todos los documentos en la colección de libros
router.delete(
  "/deleteAll",
  admin,
  handler(async (req, res) => {
    await BookModel.deleteMany({});

    res.send({
      message: "Todos los libros han sido eliminados correctamente.",
    });
  })
);
// Elimina un libro por su id
router.delete(
  "/:bookId",
  admin,
  handler(async (req, res) => {
    const { bookId } = req.params;
    await BookModel.deleteOne({ _id: bookId });
    res.send({ message: "El libro ha sido eliminado correctamente." });
  })
);
//crea un nuevo libro
router.post(
  "/",
  admin,
  handler(async (req, res) => {
    const newBook = req.body;
    const createBook = await BookModel.create(newBook);
    res.send(createBook);
  })
);
//actualiza un libro por su id
router.put(
  "/:bookId",
  admin,
  handler(async (req, res) => {
    const updateBook = req.body;
    const bookId = req.params.bookId;
    const result = await BookModel.findByIdAndUpdate(bookId, updateBook, { new: true });
    res.send(result);
    console.log("El método se ha actualizado correctamente.");
  })
);

//busca un libro por su titulo, categoria o autor
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

export default router;
