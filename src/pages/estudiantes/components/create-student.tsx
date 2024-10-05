import React, { useState } from "react";
import Modal from "../../../components/ui/modal";
import { createClient } from "../../../actions/client.actions";
import toast from "react-hot-toast";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshStudents: () => void;
}

const CreateStudentModal: React.FC<CreateStudentModalProps> = ({
  isOpen,
  onClose,
  refreshStudents,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createClient(nombre, apellido, codigo);
      toast.success("Estudiante creado correctamente");
      onClose();
      refreshStudents();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Nuevo Usuario"
      description="Agrega los datos del nuevo usuario"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="apellido"
            className="block text-sm font-medium text-gray-700"
          >
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label
            htmlFor="codigo"
            className="block text-sm font-medium text-gray-700"
          >
            Código
          </label>
          <input
            type="text"
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código"
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear Estudiante"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateStudentModal;
