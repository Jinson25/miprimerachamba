import { useEffect, useState } from "react";
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
    if (books && books.length > 0) return null;

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
    <div className="container mx-auto px-4 py-8">
      <Title title="Administrar libros" margin="1rem auto" />
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/admin/createBook"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
        >
          Crear nuevo libro
        </Link>
        <Search searchRoute="/admin/books/" defaultRoute="/admin/books" margin="1rem 0" />
      </div>
      <BooksNotFound />
      <div className="grid grid-cols-1 gap-6">
        {books &&
          books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
              <img
                src={book.portadaIMG}
                alt={book.titulo}
                className="w-16 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <Link to={`/book/${book.id}`} className="text-lg font-semibold text-blue-500 hover:underline">
                  {book.titulo}
                </Link>
                <div className="text-sm text-gray-600">
                  <p><span className="font-bold">Autor:</span> {book.autor}</p>
                  <p><span className="font-bold">Código:</span> {book.codigo}</p>
                  <p><span className="font-bold">Publicado:</span> {book.anio}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/admin/editBook/${book.id}`}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition duration-300"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteBook(book)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
