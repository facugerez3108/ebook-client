import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//pages
import LoginPage from './pages/auth/Login';
import DashboardPage from './pages/main/Dashboard';
import UsersPage from './pages/usuarios/Users';
import BooksPage from './pages/libros/Books';
import LoansPage from './pages/prestamos/Loans';
import StudentsPage from './pages/estudiantes/Students';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/usuarios' element={<UsersPage />} />
          <Route path='/libros' element={<BooksPage />} />
          <Route path='/estudiantes' element={<LoansPage />} />
          <Route path='/prestamos' element={<StudentsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
