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
import { getPrestamos, deletePrestamos } from "../../actions/prestamos.actions";

//Modals
import Alert from "../../components/ui/alert";
import CreatePrestamoModal from "./components/add-prestamo-modal";
import EditPrestamoModal from "./components/edit-prestamo-modal";

interface Prestamo {
  id: number;
  bookId: number;
  clientId: number;
  fechaPrestamo: string;
  fechaDevolucion: string;
  codigo: string;
  status: string;
}

const PrestamosPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const prestamoPerPage = 10;

  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  //alert modal
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedPrestamoId, setSelectedPrestamoId] = useState<number | null>(
    null
  );

  //edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditClick = (id: number) => {
    setSelectedPrestamoId(id);
    setIsEditModalOpen(true);
  };

  // create modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchPrestamos = async () => {
    const data = await getPrestamos();
    setPrestamos(data);
  };

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const filteredPrestamos = prestamos.filter(
    (prestamo) =>
      prestamo.fechaPrestamo.toLowerCase().includes(searchItem.toLowerCase()) ||
      prestamo.fechaDevolucion
        .toLowerCase()
        .includes(searchItem.toLowerCase()) ||
      prestamo.codigo.toLowerCase().includes(searchItem.toLowerCase()) ||
      prestamo.bookId
        .toString()
        .toLowerCase()
        .includes(searchItem.toLowerCase()) ||
      prestamo.clientId
        .toString()
        .toLowerCase()
        .includes(searchItem.toLowerCase())
  );

  const indexOfLastPrestamo = currentPage * prestamoPerPage;
  const indexofFirstPrestamo = indexOfLastPrestamo - prestamoPerPage;
  const currentPrestamos = filteredPrestamos.slice(
    indexofFirstPrestamo,
    indexOfLastPrestamo
  );

  const totalPages = Math.ceil(filteredPrestamos.length / prestamoPerPage);

  const handleDelete = async (id: number) => {
    setSelectedPrestamoId(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedPrestamoId !== null) {
      await deletePrestamos(selectedPrestamoId);
      setPrestamos(
        prestamos.filter((prestamo) => prestamo.id !== selectedPrestamoId)
      );
    }
    setIsAlertOpen(false);
    setSelectedPrestamoId(null);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Prestamos</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Lista de Prestamos</h2>
          </div>
          <div className="p-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Nuevo Prestamo
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
                <th className="text-left p-3">Cliente</th>
                <th className="text-left p-3">Fecha de Préstamo</th>
                <th className="text-left p-3">Fecha de Devolución</th>
                <th className="text-left p-3">Código</th>
                <th className="text-left p-3">Libro</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentPrestamos.map((prestamo) => (
                <tr key={prestamo.id} className="border-b">
                  <td className="p-3">{prestamo.clientId}</td>
                  <td className="p-3">{prestamo.fechaPrestamo}</td>
                  <td className="p-3">{prestamo.fechaPrestamo}</td>
                  <td className="p-3">{prestamo.codigo}</td>
                  <td className="p-3">{prestamo.bookId}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEditClick(prestamo.id)}
                      className="text-blue-500 hover:text-blue-600 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(prestamo.id)}
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
              Mostrando {indexofFirstPrestamo + 1} a{" "}
              {Math.min(indexOfLastPrestamo, filteredPrestamos.length)} de{" "}
              {filteredPrestamos.length} registros
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
      <CreatePrestamoModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        refreshPrestamos={fetchPrestamos}
      />
    </Layout>
  );
};

export default PrestamosPage;
