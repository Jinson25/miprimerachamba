import { Router } from "express";
import { Loan } from "../interfaces/loan.model.js";
import { BookModel } from "../interfaces/book.model.js";
import { UserModel } from "../interfaces/user.model.js";

const router = Router();

// Crear un nuevo préstamo
router.post('/loans', async (req, res) => {
    const { bookId, userId, startDate, endDate } = req.body;

    try {
        // Verificar si el libro existe
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }

        // Verificar si el usuario existe
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Verificar si el libro está disponible
        const existingLoan = await Loan.findOne({
            bookId,
            endDate: { $gte: new Date() },
        });
        if (existingLoan) {
            return res.status(400).json({ message: 'El libro ya está prestado.' });
        }

        const loan = new Loan({ bookId, userId, startDate, endDate });
        await loan.save();
        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el préstamo.', error });
    }
});

// Obtener todos los préstamos
router.get('/loans', async (req, res) => {
    try {
        const loans = await Loan.find().populate('bookId').populate('userId');
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los préstamos.', error });
    }
});

// Actualizar un préstamo
router.put('/loans/:id', async (req, res) => {
    const { id } = req.params;
    const { endDate } = req.body;

    try {
        const loan = await Loan.findByIdAndUpdate(id, { endDate }, { new: true });
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el préstamo.', error });
    }
});

// Eliminar un préstamo
router.delete('/loans/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Loan.findByIdAndDelete(id);
        res.status(200).json({ message: 'Préstamo eliminado.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el préstamo.', error });
    }
});

export default router;
