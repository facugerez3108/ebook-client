import React, { useState, useEffect } from "react";
import Modal from "../../../components/ui/modal";
import { getUser, editUser } from "../../../actions/user.actions";
import toast from "react-hot-toast";

interface EditUserProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  refreshUsers: () => void;
}

const EditUserModal: React.FC<EditUserProps> = ({
  isOpen,
  onClose,
  userId,
  refreshUsers,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
        if (userId != null){
            setIsLoading(true);
            try{
                const data = await getUser(userId);
                setUserData({
                    name: data.name,
                    email: data.email,
                    role: data.role,
                });
            }catch(err){
                setError("Error al obtener al usuario");
            }finally{
                setIsLoading(false);
            }
        }
    };

    if(isOpen){
        fetchUserData();
    }
    
  }, [isOpen, userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if(userId === null) return;

    setIsLoading(true);

    const { name, email, role } = userData;

    try {
      await editUser(userId, name, email, role);
      toast.success("Usuario actualizado correctamente");
      refreshUsers();
    } catch (err) {
      setError("Error al obtener al usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Editar Usuario"
        description="Seleccione el dato del usuario a editar y luego presione el boton de guardar para confirmar los cambios."
        isOpen={isOpen}
        onClose={onClose}
      >
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            >
              <option value="">Seleccione un rol</option>
              <option value="ADMIN">Administrador</option>
              <option value="USER">Usuario</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditUserModal;
