import Layout from "../../layout/layout";
import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
} from "lucide-react";
import { getBooks, deleteBook } from "../../actions/book.actions";

//MODALS
import Alert from "../../components/ui/alert";
import CreateBookModal from "./components/add-book";
import EditBookModal from "./components/edit-book";

interface Book {
  id: number;
  title: string;
  autor: string;
  code: string;
  cantidad: number;
  categoryId: number;
  createdAt: string;
}

const BooksPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const bookPerPage = 10;

  const [books, setBooks] = useState<Book[]>([]);

  //alert modal
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  //edit modal 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditClick = (id: number) => {
    setSelectedBookId(id);
    setIsEditModalOpen(true);
  }

  //create modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const filteredBook = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchItem.toLowerCase()) ||
      book.code.toLowerCase().includes(searchItem.toLowerCase()) ||
      book.cantidad.toString().toLowerCase().includes(searchItem.toLowerCase())
  );

  const indexOfLastBook = currentPage * bookPerPage;
  const indexofFirstBook = indexOfLastBook - bookPerPage;
  const currentBooks = filteredBook.slice(indexofFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBook.length / bookPerPage);

  const handleDelete = async (id: number) => {
    setSelectedBookId(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedBookId !== null) {
      await deleteBook(selectedBookId);
      setBooks(books.filter((book) => book.id !== selectedBookId));
    }
    setIsAlertOpen(false);
    setSelectedBookId(null);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Libros</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Lista de Libros</h2>
          </div>
          <div className="p-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Nuevo Libro
            </button>
          </div>
          <div className="p-4 flex justify-between items-center border-b">
            <div className="flex items-center">
              <span className="mr-2">Mostrar</span>
              <select className="border rounded px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="ml-2">registros</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Buscar:</span>
              <div className="relative">
                <input
                  type="text"
                  className="border rounded px-2 py-1 pl-8"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Titulo</th>
                <th className="text-left p-3">Autor</th>
                <th className="text-left p-3">Código</th>
                <th className="text-left p-3">Cantidad</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <tr key={book.id} className="border-b">
                  <td className="p-3">{book.title}</td>
                  <td className="p-3">{book.autor}</td>
                  <td className="p-3">{book.code}</td>
                  <td className="p-3">{book.cantidad}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEditClick(book.id)}
                      className="text-blue-500 hover:text-blue-600 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 flex justify-between items-center">
            <div>
              Mostrando {indexofFirstBook + 1} a{" "}
              {Math.min(indexOfLastBook, filteredBook.length)} de{" "}
              {filteredBook.length} registros
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
              >
                <ChevronsLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50 ml-2"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="mx-4">{currentPage}</span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50 mr-2"
              >
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
              >
                <ChevronsRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/** Modal Alert */}
      <Alert 
        type="warning"
        message="Confirmar Eliminación"
        description="¿Estas seguro que quieres eliminar este libro? No podras revertir esta elección"
        onClose={() => setIsAlertOpen(false)}
        isOpen={isAlertOpen}
        onConfirm={confirmDelete}
      />

      {/** Modal Create */}
      <CreateBookModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        refreshBooks={fetchBooks}
      />

      {/** Modal Edit */}
      <EditBookModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        refreshBooks={fetchBooks}
        id={selectedBookId ?? 0}
      />

    </Layout>
  );
};

export default BooksPage;
