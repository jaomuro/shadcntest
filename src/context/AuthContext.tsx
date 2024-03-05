import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface User {
  username: string;
  password: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  users: User[];
  login: (usename: string, password: string) => void;
  logout: () => void;
  register: (user: User) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem("isAuthenticated");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers
      ? JSON.parse(storedUsers)
      : [{ username: "jhon", password: "12345678" }];
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const navigate = useNavigate();

  function register({username, password}: )

  function login(username: string, password: string) {
    if (username === "jhon" && password === "12345678") {
      navigate("/");
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-900 p-4">
            <code className="text-white">Login realizado com sucesso</code>
          </pre>
        ),
      });
      return setIsAuthenticated(true);
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">
          <p>Login não realizado</p>
        </pre>
      ),
    });
    return setIsAuthenticated(false);
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
