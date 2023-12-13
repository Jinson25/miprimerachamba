import {useEffect, useState} from "react";
import classes from "./booksAdminPage.module.css";
import { Link, useParams } from "react-router-dom";
import { getAll, deleteById, search } from "../../services/bibliotecaService";
import NotFound from "../../components/NotFound/NotFound";
import { toast } from "react-toastify";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";


export default function BooksAdminPage() {
  const [books, setBooks] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = searchTerm ? await search(searchTerm) : await getAll();
        setBooks(booksData);
      } catch (error) {
        console.error("Error cargando libros:", error);
        // Puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje al usuario)
      }
    };

    loadBooks();
  }, [searchTerm]);


  const BooksNotFound = () => {
    if (books && books.length > 0) return;

    return searchTerm ? (
      <NotFound linkRoute="/admin/books/" linkText="Ver todo" />
    ) : (
      <NotFound linkRoute="/dashboard" linkText="Regresar al dashboard" />
    );
  };
  const deleteBook = async (book) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar el libro ${book.titulo}?`
    );
    if (!confirmed) return;

    await deleteById(book.id);
    toast.success("Libro eliminado correctamente.");
    setBooks(books.filter((b) => b.id !== book.id));
  };
  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Title title="Administrar libros" margin="1rem auto" />
        <Link to="/admin/createBook" className={`${classes.create_button} ${classes.button}`}>Crear nuevo libro</Link>
        <Search
          searchRoute="/admin/books/"
          defaultRoute="/admin/books"
          margin="1rem 0"
        />
        
        <BooksNotFound />
        {books &&
          books.map(book => (
            <div key={book.id} className={classes.list_item}>
              <img src={book.portadaIMG} alt={book.titulo} />
              <Link to={`/book/${book.id}`}>{book.titulo}</Link>
              <div className={classes.actions}>
                <Link to={`/admin/editBook/${book.id}`}>Editar</Link>
                <Link onClick={() => deleteBook(book)}>Eliminar</Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
