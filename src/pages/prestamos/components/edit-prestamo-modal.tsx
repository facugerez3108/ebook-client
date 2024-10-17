import React, { useState, useEffect } from "react";
import Modal from "../../../components/ui/modal";
import { editPrestamos } from "../../../actions/prestamos.actions";
import { getBooks } from "../../../actions/book.actions";
import { getClients } from "../../../actions/client.actions";
import { getPrestamo } from "../../../actions/prestamos.actions";
import toast from "react-hot-toast";

interface EditPrestamoProps {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
  refreshPrestamos: () => void;
}

interface BooksProps {
  id: number;
  title: string;
  code: string;
}

interface ClientsProps {
  id: number;
  nombre: string;
  apellido: string;
  codigo: string;
}

const EditPrestamoModal: React.FC<EditPrestamoProps> = ({
  isOpen,
  onClose,
  id,
  refreshPrestamos,
}) => {
  const [prestamoData, setPrestamoData] = useState({
    fechaDevolucion: "",
    codigo: "",
    status: "PENDIENTE",
    comprador: "",
    book: "",
    fechaPrestamo: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [books, setBooks] = useState<BooksProps[]>([]);
  const [clients, setClients] = useState<ClientsProps[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BooksProps[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientsProps[]>([]);
  const [selectedBook, setSelectedBook] = useState<BooksProps | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientsProps | null>(
    null
  );

  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [bookSearchTerm, setBookSearchTerm] = useState("");

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      setError("Error al cargar los libros");
    }
  };

  const fetchClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      setError("Error al cargar los clientes");
    }
  };

  //fetchPrestamo
  const fetchPrestamoDetails = async (id: number) => {
    try {
      const data = await getPrestamo(id);
      if (data) {
        // Obtener detalles completos del comprador y del libro
        const clientData = clients.find(client => client.id === data.compradorId);
        const bookData = books.find(book => book.id === data.bookId);
  
        setPrestamoData({
          fechaDevolucion: data.fechaDevolucion.split("T")[0], // Formato de fecha
          codigo: data.codigo,
          status: data.status,
          comprador: clientData ? `${clientData.nombre} ${clientData.apellido} - ${clientData.codigo}` : "",
          book: bookData ? `${bookData.title} - ${bookData.code}` : "",
          fechaPrestamo: data.fechaPrestamo.split("T")[0],
        });
  
        setSelectedClient(clientData || null);
        setSelectedBook(bookData || null);
        setClientSearchTerm(
          clientData ? `${clientData.nombre} ${clientData.apellido} - ${clientData.codigo}` : ""
        );
        setBookSearchTerm(bookData ? `${bookData.title} - ${bookData.code}` : "");
  
        // Limpiar el error si se cargan los datos exitosamente
        setError("");
      }
    } catch (error) {
      setError("Error al cargar los datos del préstamo");
    }
  };

  useEffect(() => {
    if (isOpen && id) {
      fetchPrestamoDetails(id);
    }
  }, [isOpen, id]);

  useEffect(() => {
    if (isOpen && id !== null) {
      try {
        fetchBooks();
        fetchClients();
        fetchPrestamoDetails(id);
      } catch (error) {
        setError("Error al cargar los datos");
      }
    }
  }, [isOpen, id]);

  // Manejo de búsqueda para clientes
  const handleClientSearch = (searchTerm: string) => {
    setClientSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredClients([]);
    } else {
      const filtered = clients.filter(
        (client) =>
          client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.codigo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  };

  // Manejo de búsqueda para libros
  const handleBookSearch = (searchTerm: string) => {
    setBookSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredBooks([]);
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleClientSelect = (client: ClientsProps) => {
    // Guardar el cliente seleccionado en el estado
    setSelectedClient(client);
    // Mostrar el nombre y apellido en el input
    setClientSearchTerm(
      `${client.nombre} ${client.apellido} - ${client.codigo}`
    );
    setFilteredClients([]); // Limpiar la lista
  };

  const handleBookSelect = (book: BooksProps) => {
    setSelectedBook(book);
    setBookSearchTerm(`${book.title} - ${book.code}`);
    setFilteredBooks([]); // Limpiar la lista
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPrestamoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id === null) return;

    setIsLoading(true);
    const { fechaDevolucion, codigo, status, fechaPrestamo } = prestamoData;

    const compradorId = selectedClient
      ? parseInt(selectedClient.id.toString(), 10)
      : null;
    const bookId = selectedBook
      ? parseInt(selectedBook.id.toString(), 10)
      : null;

    if (!compradorId || !bookId) {
      setError("Debe seleccionar un cliente y un libro.");
      setIsLoading(false);
      return;
    }

    try {
      await editPrestamos(
        id,
        bookId,
        compradorId,
        new Date(fechaPrestamo),
        new Date(fechaDevolucion),
        codigo,
        status
      );

      toast.success("Prestamo editado correctamente");
      refreshPrestamos();
      onClose();
    } catch (err) {
      setError("Error al editar el prestamo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Prestamo"
      description="Edita los datos del prestamo, recuerda que tanto los ESTUDIANTES como los LIBROS deben estar registrados previamente antes de editarlos."
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSave} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {/* Busqueda y selección del cliente */}
        <div>
          <label
            htmlFor="searchClient"
            className="block text-sm font-medium text-gray-700"
          >
            Buscar Cliente (Nombre, Apellido o Código)
          </label>
          <input
            type="text"
            id="searchClient"
            name="comprador"
            placeholder="Buscar cliente..."
            value={clientSearchTerm}
            onChange={(e) => handleClientSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          {filteredClients.length > 0 && (
            <ul className="mt-2 border rounded max-h-40 overflow-y-auto">
              {filteredClients.map((client) => (
                <li
                  key={client.id}
                  onClick={() => handleClientSelect(client)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedClient?.id === client.id ? "bg-gray-200" : ""
                  }`}
                >
                  {client.nombre} {client.apellido} - Código: {client.codigo}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Búsqueda y selección del libro */}
        <div>
          <label
            htmlFor="searchBook"
            className="block text-sm font-medium text-gray-700"
          >
            Buscar Libro (Título o Código)
          </label>
          <input
            type="text"
            id="searchBook"
            name="book"
            placeholder="Buscar libro..."
            value={bookSearchTerm}
            onChange={(e) => handleBookSearch(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
          {filteredBooks.length > 0 && (
            <ul className="mt-2 border rounded max-h-40 overflow-y-auto">
              {filteredBooks.map((book) => (
                <li
                  key={book.id}
                  onClick={() => handleBookSelect(book)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedBook?.id === book.id ? "bg-gray-200" : ""
                  }`}
                >
                  {book.title} - Código: {book.code}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Fecha de devolución */}
        <div>
          <label
            htmlFor="fechaDevolucion"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Devolución
          </label>
          <input
            type="date"
            id="fechaDevolucion"
            name="fechaDevolucion"
            value={prestamoData.fechaDevolucion}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        {/* Código y Estado */}
        <div>
          <label
            htmlFor="codigo"
            className="block text-sm font-medium text-gray-700"
          >
            Código de Préstamo
          </label>
          <input
            type="text"
            id="codigo"
            name="codigo"
            value={prestamoData.codigo}
            onChange={handleChange}
            placeholder="Código de Prestamo"
            className="border rounded px-3 py-2 w-full"
            required
          />

          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Estatus del Préstamo
          </label>
          <select
            id="status"
            name="status"
            value={prestamoData.status}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="DEVUELTO">Devuelto</option>
          </select>
        </div>

        {/* Botón de submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear Préstamo"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPrestamoModal;
