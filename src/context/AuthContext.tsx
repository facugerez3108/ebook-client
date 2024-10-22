import { createContext, useState, ReactNode, useEffect } from "react";
import { getUserRole } from "../actions/user.actions";

interface User {
    role: string;
    name: string;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    login: async () => {},
    logout: () => {},
    user: null
});



export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          getUserRole(token).then((userData) => {
            setIsAuthenticated(true);
            setUser({ role: userData.role, name: userData.name });
          }).catch((error) => {
            console.error("Error al obtener el rol del usuario", error);
            logout();
          });
        }
    }, []);


    const login = async (token: string) => {
       try{
            localStorage.setItem("token", token);
            const role = await getUserRole(token);
            setIsAuthenticated(true);
            setUser({ role, name: role.name });
       }catch(error){
            console.error("Error al obtener el rol del usuario", error);
            logout();
       }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
          {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;