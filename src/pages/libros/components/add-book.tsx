import React, { useState, useEffect } from "react";
import Modal from "../../../components/ui/modal";
import { createBook } from "../../../actions/book.actions";
import { getCategories } from "../../../actions/categories.actions";
import toast from "react-hot-toast";

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshBooks: () => void;
}

interface CategoryProps {
  id: number;
  title: string;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({
  isOpen,
  onClose,
  refreshBooks,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [autor, setAutor] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [code, setCode] = useState("");

  // obtener categorias
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Obtener las categorías cuando el modal esté abierto
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const data = await getCategories();
          console.log("Categorias obtenidas", data);
          setCategories(data);
        } catch (error) {
          setError("Error al cargar las categorías");
        }
      };
      fetchCategories();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (selectedCategory === null) {
        setError("Debe seleccionar una categoría");
        setIsLoading(false);
        return;
      }

      console.log("ID de la categoria seleccionada", selectedCategory)

      await createBook(title, autor, cantidad, code, selectedCategory);
      toast.success("Libro creado correctamente");
      refreshBooks();
      onClose();
    } catch (error) {
      setError("Error al crear el libro");
      toast.error("Error al crear el libro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Crear Libro"
      description="Agrega los datos del nuevo libro"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del Libro"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="autor"
            className="block text-sm font-medium text-gray-700"
          >
            Autor
          </label>
          <input
            type="text"
            id="autor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Autor del Libro"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="cantidad"
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            placeholder="Cantidad"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Código
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Código del Libro"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <select
            id="category"
            value={selectedCategory ?? ""}
            onChange={(e) => {
              console.log("Categoría seleccionada:", e.target.value);
              setSelectedCategory(Number(e.target.value));
            }}
            className="border rounded px-3 py-2 w-full"
            required
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear Libro"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateBookModal;
