import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const newReportSchema = z.object({
  ofensor: z.string(),
  // tipoDeIncidente: z.string(),
  // designador: z.string(),
  // impactoDoIncidente: z.string(),
  // equipeAtuante: z.string(),
  // inicioDoIncidente: z.date(),
  // impactBL: z.number(),
  // impactP2P: z.number(),
  // operadoraResponsavel: z.string(),
  // circuitoDaOperadora: z.string(),
});

type newReportSchemaType = z.infer<typeof newReportSchema>;

function SelectOfensor(form: any) {
  return (
    <FormField
      name="ofensor"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ofensor</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Escolha um Ofensor" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="INDISPONIBILIDADE">
                INDISPONIBILIDADE
              </SelectItem>
              <SelectItem value="LATENCIAELEVADA">LATÊNCIA ELEVADA</SelectItem>
              <SelectItem value="DEGRADACAO">DEGRADAÇÃO</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

export function NewReportForm() {
  const form = useForm<newReportSchemaType>({
    resolver: zodResolver(newReportSchema),
  });

  function onSubmit(data: newReportSchemaType) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Novo informativo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Criar Informativo</DialogTitle>
          <DialogDescription>
            Adicione as informações do sinistro
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              id="reportform"
              className="grid grid-cols-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <SelectOfensor form={form} />
              <SelectOfensor form={form} />
              <SelectOfensor form={form} />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="reportform">
            Criar
          </Button>
          <Button type="button">Limpar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
