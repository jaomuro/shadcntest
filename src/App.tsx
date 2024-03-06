import { Router } from "./Router";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "./theme-provider";

export function App() {
  return (
    <div className=" flex  justify-center items-center h-[100vh]">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <AuthContextProvider>
            <Router />
          </AuthContextProvider>
        </BrowserRouter>
        <Toaster></Toaster>
      </ThemeProvider>
    </div>
  );
}
