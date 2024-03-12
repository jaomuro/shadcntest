import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Definindo o esquema Zod para validação
const FormSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  idade: z.coerce.number().min(18, "Idade deve ser pelo menos 18 anos"),
});

// Tipagem para os valores do formulário
type FormValues = z.infer<typeof FormSchema>;

const SimpleForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-3">
      <div>
        <label>
          Nome:
          <Input {...register("nome")} type="text" />
          {errors.nome && <p>{errors.nome.message}</p>}
        </label>
      </div>

      <div>
        <label>
          Idade:
          <Input {...register("idade")} type="number" />
          {errors.idade && <p>{errors.idade.message}</p>}
        </label>
      </div>
      <Button variant={"destructive"} type="submit">
        Enviar
      </Button>
    </form>
  );
};

export { SimpleForm };
