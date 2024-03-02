import { LoginForm } from "@/pages/login-form";
import { Toaster } from "./components/ui/toaster";

export function App() {
  return (
    <div className=" flex  justify-center items-center h-[100vh]">
      <LoginForm></LoginForm>
      <Toaster></Toaster>
    </div>
  );
}
