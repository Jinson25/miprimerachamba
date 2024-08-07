import { Router } from "express";
import { Loan } from "../interfaces/loan.model.js";
import { BookModel } from "../interfaces/book.model.js";
import { UserModel } from "../interfaces/user.model.js";

const router = Router();

// Crear un nuevo préstamo
router.post('/loans', async (req, res) => {
    const { bookId, userId, startDate, endDate, cedula } = req.body;

    try {
        // Verificar si el libro existe
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado.' });
        }

        // Verificar si el libro está disponible
        if (!book.disponibles) {
            return res.status(400).json({ message: 'El libro no está disponible para préstamo.' });
        }

        // Verificar si el usuario existe
        const user = await UserModel.findOne({ cedula });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Crear el préstamo si todo está bien
        const loan = new Loan({ bookId, userId: user._id, startDate, endDate, cedula });
        await loan.save();

        // Actualizar el estado del libro a no disponible
        book.disponibles = false;
        await book.save();

        res.status(201).json(loan);
    } catch (error) {
        console.error('Error al crear el préstamo:', error);
        res.status(500).json({ message: 'Error al crear el préstamo.', error });
    }
});

// Obtener todos los préstamos
router.get('/loans', async (req, res) => {
    try {
        const loans = await Loan.find().populate('bookId').populate('userId');
        res.status(200).json(loans);
    } catch (error) {
        console.error('Error al obtener los préstamos:', error);
        res.status(500).json({ message: 'Error al obtener los préstamos.', error });
    }
});

// Actualizar un préstamo
router.put('/loans/:id', async (req, res) => {
    const { id } = req.params;
    const { endDate } = req.body;

    try {
        const loan = await Loan.findByIdAndUpdate(id, { endDate, returned: true }, { new: true }); // Actualiza el préstamo para marcarlo como devuelto
        
        if (endDate) {
            // Actualizar la disponibilidad del libro
            const book = await BookModel.findById(loan.bookId);
            book.disponibles = true;
            await book.save();
        }

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
        console.error('Error al eliminar el préstamo:', error);
        res.status(500).json({ message: 'Error al eliminar el préstamo.', error });
    }
});

export default router;
