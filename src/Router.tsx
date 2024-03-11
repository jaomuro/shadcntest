import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { LoginForm } from "./pages/login-form";
import { SignUpForm } from "./pages/singup-form";
import { NotFound } from "./pages/not-found";
import { PrivateRoutes } from "./ProtectedRoutes/protected-routes";
import { DateTimePickerDemoWithFormShadcnUI } from "./components/time-picker-demo-in-form-shadcn";
import { CheckboxReactHookFormMultipleDinamic } from "./testes/checkboxes-dinamic";
export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />}></Route>
      </Route>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<SignUpForm />} />
      <Route path="*" element={<NotFound />} />
      <Route
        path="/datetime"
        element={<DateTimePickerDemoWithFormShadcnUI />}
      />
      <Route path="/test" element={<CheckboxReactHookFormMultipleDinamic />} />
    </Routes>
  );
}
