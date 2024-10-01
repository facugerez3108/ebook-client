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
import {
  getCategories,
  deleteCategories,
} from "../../actions/categories.actions";
import Alert from "../../components/ui/alert";
import CreateCategory from "./components/create-category";
import EditCategory from "./components/edit-category";

interface Category {
  id: number;
  title: string;
  createdAt: string;
}

const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const catPerPage = 10;

  const [categories, setCategories] = useState<Category[]>([]);

  //alert modal
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  //create modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  //edit categories
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleEditClick = (id: number) => {
    setSelectedCategoryId(id);
    setIsEditModalOpen(true);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories?.length 
  ? categories.filter((category) =>
      category.title.toLowerCase().includes(searchItem.toLowerCase())
    ) 
  : [];

  const indexOfFirstCategories = currentPage - catPerPage;
  const indexOfLastCategories = indexOfFirstCategories * catPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategories,
    indexOfLastCategories
  );

  const totalPages = Math.ceil(filteredCategories.length / catPerPage);

  const handleDelete = async (id: number) => {
    setSelectedCategoryId(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedCategoryId !== null) {
      await deleteCategories(selectedCategoryId);
      setCategories(categories.filter((category) => category.id !== selectedCategoryId))
      setIsAlertOpen(false);
      setSelectedCategoryId(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Categorías</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Lista de Categorías</h2>
          </div>
          <div className="p-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Agregar Cateogoría
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
              <span className="ml-2">Registros</span>
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
                  className="absolute left-2 top-1/2 transform -traslate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3">Título</th>
                <th className="text-left p-3">Fecha de Creación</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
                {filteredCategories.length === 0 ? (
                    <tr>
                        <td colSpan={3} className="text-center p-3">No hay categorías creadas</td>
                    </tr>
                ) : (
                   currentCategories.map((category) => (
                        <tr key={category.id} className="border-b">
                            <td className="p-3">{category.title}</td>
                            <td className="p-3">{category.createdAt}</td>
                            <td className="p-3">
                                <button onClick={() => handleEditClick(category.id)} className="text-blue-500 hover:text-blue-600 mr-2">
                                    <Edit size={18} />
                                </button>
                                <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-600">
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
          </table>
          <div className="p-4 flex justify-between items-center">
             <div> 
                Mostrando {indexOfFirstCategories + 1} a{" "}
                {Math.min(indexOfLastCategories, filteredCategories.length)} de{" "}
                {filteredCategories.length} registros
             </div>
             <div className="flex items-center">
                <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="px-2 py-1 rounded bg-gray-200 text-gray-600 disabled:opacity-50"
                >   
                    <ChevronLeft size={18} /> 
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
        description="¿Estas seguro que quieres eliminar esta categoría? No podras revertir esta elección"
        onClose={() => setIsAlertOpen(false)}
        isOpen={isAlertOpen}
        onConfirm={confirmDelete}
      />
      {/** FIN MODAL ALERT */}
      
      {/** Modal Create */}
      <CreateCategory
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        refreshCategories={fetchCategories}
      />
      {/** FIN MODAL CREATE */}

      {/** Modal Edit */}
      <EditCategory
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        refreshCategories={fetchCategories}
        id={selectedCategoryId ?? 0}
      />

    </Layout>
  );
};

export default Categories;
