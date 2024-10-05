import Layout from "../../layout/layout";
import { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
} from "lucide-react";
import { deleteClient, getClients } from "../../actions/client.actions";

//modals
import Alert from "../../components/ui/alert";
import CreateStudentModal from "./components/create-student";
import EditStudentModal from "./components/edit-student";

interface Student {
  id: number;
  nombre: string;
  apellido: string;
  codigo: string;
}

const StudentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const studentPerPage = 10;

  const [students, setStudents] = useState<Student[]>([]);

  //alert modal
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );

  //create user modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  //edit user modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditClick = (id: number) => {
    setSelectedStudentId(id);
    setIsEditModalOpen(true);
  };

  const fetchStudents = async () => {
    const data = await getClients();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudent = students.filter(
    (student) =>
      student.nombre.toLowerCase().includes(searchItem.toLowerCase()) ||
      student.apellido.toLowerCase().includes(searchItem.toLowerCase()) ||
      student.codigo.toLowerCase().includes(searchItem.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentPerPage;
  const indexofFirstStudent = indexOfLastStudent - studentPerPage;
  const currentStudents = filteredStudent.slice(
    indexofFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudent.length / studentPerPage);

  const handleDelete = async (id: number) => {
    setSelectedStudentId(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedStudentId !== null) {
      await deleteClient(selectedStudentId);
      setStudents(
        students.filter((student) => student.id !== selectedStudentId)
      );
      setIsAlertOpen(false);
      setSelectedStudentId(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Estudiantes</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Lista de Estudiantes</h2>
          </div>
          <div className="p-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Nuevo Estudiante
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
                <th className="text-left p-3">Nombre</th>
                <th className="text-left p-3">Apellido</th>
                <th className="text-left p-3">Código</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="p-3">{student.nombre}</td>
                  <td className="p-3">{student.apellido}</td>
                  <td className="p-3">{student.codigo}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleEditClick(student.id)}
                      className="text-blue-500 hover:text-blue-600 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
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
              Mostrando {indexofFirstStudent + 1} a{" "}
              {Math.min(indexOfLastStudent, filteredStudent.length)} de{" "}
              {filteredStudent.length} registros
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

      {/** ALERT MODAL */}
      <Alert 
        message="Confirmar Eliminación"
        type="warning"
        description="¿Estas seguro que quieres eliminar este estudiante?"
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={confirmDelete}
      />

      {/** MODAL PARA CREAR NUEVO ESTUDIANTE */}
      <CreateStudentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        refreshStudents={fetchStudents} 
      />

      {/** MODAL PARA EDITAR ESTUDIANTE */}

    </Layout>
  );
};

export default StudentsPage;
