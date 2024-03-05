import { Router } from "./Router";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

export function App() {
  return (
    <div className=" flex  justify-center items-center h-[100vh]">
      <BrowserRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
      <Toaster></Toaster>
    </div>
  );
}
