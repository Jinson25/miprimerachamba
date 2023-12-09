import { Router } from 'express';
import { data_biblioteca } from '../data.js';

const router = Router();

router.get('/', (req, res) => {
    res.send(data_biblioteca);
});

router.get('/search/:searchTerm', (req, res) => {
    const { searchTerm } = req.params;
    // Asigna el resultado de filter a la variable books
    const books = data_biblioteca.filter(item =>
        item.titulo && item.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    res.send(books);
    
});

router.get('/:bookId', (req, res) => {
    const { bookId } = req.params;
    const book = data_biblioteca.find(item => item.id === bookId);
    res.send(book);
});

export default router;
