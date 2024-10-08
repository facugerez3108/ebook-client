import React, { useState, useEffect } from "react";
import Modal from "../../../components/ui/modal";
import { createPrestamo } from "../../../actions/prestamos.actions";
import { getBooks } from "../../../actions/book.actions";
import { getClients } from "../../../actions/client.actions";
import toast from "react-hot-toast";

interface CreatePrestamoProps {
  isOpen: boolean;
  onClose: () => void;
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

const CreatePrestamoModal: React.FC<CreatePrestamoProps> = ({
  isOpen,
  onClose,
  refreshPrestamos,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [codigo, setCodigo] = useState("");
  const [status, setStatus] = useState("PENDIENTE");

  //obtener libros y clientes
  const [books, setBooks] = useState<BooksProps[]>([]);
  const [clients, setClients] = useState<ClientsProps[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BooksProps[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientsProps[]>([]);
  const [selectedBook, setSelectedBook] = useState<BooksProps | null>(null);
  const [selectedClient, setSelectedClient] = useState<ClientsProps | null>(null);

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

  useEffect(() => {
    if (isOpen) {
      try {
        fetchBooks();
        fetchClients();
      } catch (error) {
        setError("Error al cargar los datos");
      }
    }
  }, [isOpen]);

  // Manejo de búsqueda para clientes
  const handleClientSearch = (searchTerm: string) => {
    setClientSearchTerm(searchTerm); 
    if (searchTerm === "") {
        setFilteredClients([]);
    } else {
        const filtered = clients.filter(client =>
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
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
    }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!selectedClient) {
        setError("Debe seleccionar un cliente existente");
        setIsLoading(false);
        return;
      }

      if (!selectedBook) {
        setError("Debe seleccionar un libro existente");
        setIsLoading(false);
        return;
      }

      await createPrestamo(
        selectedBook.id,
        selectedClient.id,
        new Date(), // Fecha de préstamo actual
        new Date(fechaDevolucion),
        codigo,
        status
      );
      toast.success("Préstamo creado correctamente");
      refreshPrestamos();
      onClose();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Crear Prestamo"
      description="Agrega los datos del prestamo, recuerda que tanto los ESTUDIANTES como los LIBROS deben estar registrados previamente."
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        {/* Búsqueda y selección del cliente */}
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
                  onClick={() => {
                    setSelectedClient(client);
                    setClientSearchTerm(
                      `${client.nombre} ${client.apellido} - ${client.codigo}`
                    );
                    setFilteredClients([]); // Ocultar la lista después de la selección
                  }}
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
                  onClick={() => {
                    setSelectedBook(book);
                    setBookSearchTerm(`${book.title} - ${book.code}`);
                    setFilteredBooks([]); // Ocultar la lista después de la selección
                  }}
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
            value={fechaDevolucion}
            onChange={(e) => setFechaDevolucion(e.target.value)}
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
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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

export default CreatePrestamoModal;
