import { Router } from "express";
import { BookModel } from "../interfaces/book.model.js";
import handler from "express-async-handler";
const router = Router();

router.get(
  "/",
  handler(async (req, res) => {
    const books = await BookModel.find({});
    res.send(books);
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
                { autor: { $regex: searchRegex } }
            ]
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
