import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface User {
  username: string;
  password: string;
}

interface UserAuthenticated {
  username: string;
  auth: boolean;
  token: string;
  role: string;
}

interface AuthContextProps {
  isAuthenticated: UserAuthenticated | null;
  users: User[];
  login: (usename: string, password: string) => void;
  logout: () => void;
  register: (user: User) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] =
    useState<UserAuthenticated | null>(() => {
      const storedValue = localStorage.getItem("isAuthenticated");
      return storedValue ? JSON.parse(storedValue) : null;
    });

  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("usersDb");
    return storedUsers
      ? JSON.parse(storedUsers)
      : [{ username: "jhon", password: "12345678" }];
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("usersDb", JSON.stringify(users));
  }, [isAuthenticated, users]);

  const navigate = useNavigate();

  function register({ username, password }: User) {
    setUsers((state) => {
      return [...state, { username, password }];
    });
  }

  function login(username: string, password: string) {
    console.log(users);
    const isUserMatch = users.find(
      (user) => user.username === username && user.password === password
    );

    if (isUserMatch) {
      navigate("/");
      const token = Math.random().toString(36);
      const currentUser = {
        username,
        auth: true,
        token,
        role: "test",
      };
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-900 p-4">
            <code className="text-white">Login realizado com sucesso</code>
          </pre>
        ),
      });
      return setIsAuthenticated(currentUser);
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">
          <p>Login não realizado {String(isUserMatch)}</p>
        </pre>
      ),
    });
    return setIsAuthenticated(null);
  }

  function logout() {
    setIsAuthenticated(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, register, users }}
    >
      {children}
    </AuthContext.Provider>
  );
}
