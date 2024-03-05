import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/useAuth";

const loginSchema = z.object({
  username: z.string().min(2),
  password: z
    .string()
    .min(5, { message: "A senha precisa ter no mínimo 8 caracteres" }),
});

type loginSchemaType = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login } = useAuth();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  function onSubmit(data: loginSchemaType) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    login(data.username, data.password);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
        <CardDescription>
          Adicione seu usuário e senha para entrar na sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="teste@jhon.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="sua senha..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <Button type="submit">Entrar</Button>
            <Button asChild variant={"link"}>
              <Link to="/register">cadastre-se</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
