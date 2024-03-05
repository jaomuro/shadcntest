import { Router } from "./Router";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <div className=" flex  justify-center items-center h-[100vh]">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Toaster></Toaster>
    </div>
  );
}
