import React, { FormEvent, useContext, useState } from "react";
import { login } from "../../actions/auth.actions";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      const accessToken = response.tokens.access.token;
      authLogin(accessToken);
      navigate("/dashboard");
    } catch (error) {
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Fixed Classic Library Background */}
      <div className="absolute inset-0"
           style={{
             background: `
               linear-gradient(135deg, #f4f1e8 0%, #e8dcc6 25%, #d4c5a9 50%, #c9b899 75%, #b8a082 100%),
               radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.08) 0%, transparent 50%),
               radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.06) 0%, transparent 50%)
             `
           }}>
        {/* Book spines simulation */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, 
              transparent 0px, transparent 45px,
              rgba(139, 69, 19, 0.12) 46px, rgba(139, 69, 19, 0.12) 48px,
              transparent 49px, transparent 55px,
              rgba(101, 67, 33, 0.10) 56px, rgba(101, 67, 33, 0.10) 58px
            ),
            repeating-linear-gradient(90deg, 
              transparent 0px, transparent 120px,
              rgba(139, 69, 19, 0.08) 121px, rgba(139, 69, 19, 0.08) 125px
            )
          `
        }}></div>
        {/* Decorative book elements */}
        <div className="absolute top-20 left-16 w-8 h-32 bg-gradient-to-b from-red-800/20 to-red-900/20 rounded-sm transform rotate-2"></div>
        <div className="absolute top-24 left-24 w-6 h-28 bg-gradient-to-b from-blue-800/20 to-blue-900/20 rounded-sm transform -rotate-1"></div>
        <div className="absolute bottom-32 right-20 w-10 h-36 bg-gradient-to-b from-green-800/20 to-green-900/20 rounded-sm transform rotate-3"></div>
      </div>

      {/* Subtle overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden border border-white/20">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="text-center mb-2">
              <div className="text-4xl mb-2">📚</div>
              <h1 className="text-lg font-semibold text-blue-800 mb-1">Sistema de Biblioteca Escolar</h1>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Iniciar Sesión
            </h2>
            <p className="text-center text-gray-600 mt-1">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>
          <div className="px-6 py-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo electronico
                </label>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="Ingresa tu correo"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Ingresa tu contraseña"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
              
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 rounded-md"
                >
                  Iniciar Sesión
                </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
