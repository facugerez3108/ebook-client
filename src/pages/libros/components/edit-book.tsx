import React, { useState, useEffect } from "react";
import Modal from "../../../components/ui/modal";
import { getBook, updateBooks } from "../../../actions/book.actions";
import { getCategories } from "../../../actions/categories.actions";
import toast from "react-hot-toast";

interface EditBookProps {
  isOpen: boolean;
  onClose: () => void;
  id: number | null;
  refreshBooks: () => void;
}

interface Category {
  id: number;
  title: string;
}

const EditBookModal: React.FC<EditBookProps> = ({
  isOpen,
  onClose,
  id,
  refreshBooks,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [bookData, setBookData] = useState({
    title: "",
    autor: "",
    cantidad: "",
    code: "",
    categoryId: "",
  });

  useEffect(() => {
    const fetchBookData = async () => {
      if (id !== null) {
        setIsLoading(true);
        try {
          const data = await getBook(id); // Verifica que la estructura sea la correcta
          if (data) {
            setBookData({
              title: data.title || "",
              autor: data.autor || "",
              cantidad: data.cantidad || 0,
              code: data.code || "",
              categoryId: data.categoryId || 0,
            });
          }
        } catch (err) {
          setError("Error al obtener los datos del libro");
        } finally {
          setIsLoading(false);
        }
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData); // Guarda las categorías en el estado
      } catch (err) {
        setError("Error al obtener las categorías");
      }
    };

    if (isOpen) {
      fetchBookData();
      fetchCategories(); // Obtén las categorías cuando se abra el modal
    }
  }, [isOpen, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id === null) return;

    setIsLoading(true);

    const { title, autor, cantidad, code, categoryId } = bookData;
    try {
      await updateBooks(
        id,
        title,
        autor,
        Number(cantidad),
        code,
        Number(categoryId)
      );
      toast.success("Libro actualizado correctamente");
      refreshBooks();
      onClose();
    } catch (err) {
      setError("Error al actualizar el libro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Libro"
      description="Actualiza los datos del libro y presiona guardar"
      isOpen={isOpen}
      onClose={onClose}
    >
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="autor"
            className="block text-sm font-medium text-gray-700"
          >
            Autor
          </label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={bookData.autor}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="cantidad"
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            value={bookData.cantidad}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-sm font-medium text-gray-700"
          >
            Código
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={bookData.code}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={bookData.categoryId}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          >
            <option value="">Seleccione una categoría</option>
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBookModal;
