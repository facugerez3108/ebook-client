import Layout from "../../layout/layout";
import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  Trash2,
} from "lucide-react";
import { getUsers } from "../../actions/user.actions";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

//test
const initialState: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    createdAt: "2022-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    createdAt: "2022-02-15",
  },
];

const UsersPage = () => {
  //const [users] = useState<User[]>(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const userPerPage = 10;

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      console.log(data)
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const filteredUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      user.email.toLowerCase().includes(searchItem.toLowerCase()) ||
      user.role.toLowerCase().includes(searchItem.toLowerCase())
  );

  const indexOfLastUser = currentPage * userPerPage;
  const indexofFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = filteredUser.slice(indexofFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUser.length / userPerPage);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Lista de Usuarios</h2>
          </div>
          <div className="p-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Nuevo Usuario
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
                <th className="text-left p-3">Nombre de Usuario</th>
                <th className="text-left p-3">Correo</th>
                <th className="text-left p-3">Fecha de Creación</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.createdAt}</td>
                  <td className="p-3">
                    <button className="text-blue-500 hover:text-blue-600 mr-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 flex justify-between items-center">
            <div>
              Mostrando {indexofFirstUser + 1} a{" "}
              {Math.min(indexOfLastUser, filteredUser.length)} de{" "}
              {filteredUser.length} registros
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
    </Layout>
  );
};

export default UsersPage;
