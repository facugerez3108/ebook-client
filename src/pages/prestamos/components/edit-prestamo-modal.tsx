import React, { useState, useEffect } from "react";
import Modal from "../../../components/ui/modal";
import { editPrestamos } from "../../../actions/prestamos.actions";
import { getBooks } from "../../../actions/book.actions";
import { getClients } from "../../../actions/client.actions";
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
  refreshPrestamos
}) => {
  
  const [prestamoData, setPrestamoData] = useState({
    fechaDevolucion: "",
    codigo: "",
    status: "PENDIENTE",
    comprador: "",
    book: "",
    fechaPrestamo: ""
  })
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setPrestamoData((prevData) => ({
        ...prevData,
        [name]: value
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id === null) return;
    
    setIsLoading(true);
    const { fechaDevolucion, codigo, status, comprador, book, fechaPrestamo } = prestamoData;

    try{
        //await editPrestamos(
        //    id,
        //    fechaDevolucion,
        //    fechaPrestamo,
        //    codigo,
        //    status,
        //    comprador,
        //    book
        //);

        toast.success("Prestamo editado correctamente");
        refreshPrestamos();
        onClose();

    }catch(err){
        setError("Error al editar el prestamo")
    }finally{
        setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Crear Prestamo"
      description="Edita los datos del prestamo, recuerda que tanto los ESTUDIANTES como los LIBROS deben estar registrados previamente antes de agregarlos."
      isOpen={isOpen}
      onClose={onClose}
    >
        {error && <p className="text-red-500">{error}</p>}
    </Modal>
  );
};

export default EditPrestamoModal;
