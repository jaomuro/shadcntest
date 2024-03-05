import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/useAuth";
import { Link } from "react-router-dom";

export function Home() {
  const { logout } = useAuth();

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Home</CardTitle>
        <CardDescription>
          Aqui será a página inicial da aplicação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Aperte o botão baixo para sair</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant={"destructive"} onClick={() => logout()}>
          <Link to="/login">Sair</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
