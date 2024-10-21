import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout";
import { getBooks } from "../../actions/book.actions";
import { getClients } from "../../actions/client.actions";
import { getPrestamos } from "../../actions/prestamos.actions";


const DashboardPage: React.FC = () => {
  const [totalLibros, setTotalLibros] = useState(0);
  const [totalEstudiantes, setTotalEstudiantes] = useState(0);
  const [totalPrestamos, setTotalPrestamos] = useState(0);
  const [totalDevoluciones, setTotalDevoluciones] = useState(0);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      const libros = await getBooks();
      const estudiantes = await getClients();
      const prestamos = await getPrestamos();

      setTotalLibros(libros.length);
      setTotalEstudiantes(estudiantes.length);
      setTotalPrestamos(prestamos.length);

      const devolucines = prestamos.filter(
        (prestamos: any) => prestamos.status === "DEVUELTO"
      );
      setTotalDevoluciones(devolucines.length);
    } catch (error) {
      setError("Error al cargar los datos de la dashboard");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Total Libros</h3>
            <p className="text-2xl">{totalLibros}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Total Estudiantes</h3>
            <p className="text-2xl">{totalEstudiantes}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Total Préstamos</h3>
            <p className="text-2xl">{totalPrestamos}</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            <h3 className="text-xl font-semibold">Total Devoluciones</h3>
            <p className="text-2xl">{totalDevoluciones}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
