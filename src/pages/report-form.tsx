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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { DateTimePickerDemo } from "@/components/date-time-picker-demo";

const newReportSchema = z.object({
  ofensor: z.string(),
  tipoDeIncidente: z.string(),
  designador: z.string(),
  // impactoDoIncidente: z.string(),
  // equipeAtuante: z.string(),
  inicioDoIncidente: z.date(),
  // impactBL: z.number(),
  // impactP2P: z.number(),
  // operadoraResponsavel: z.string(),
  // circuitoDaOperadora: z.string(),
});

interface OptionType {
  value: string;
  label: string;
}

const tipoDeIncidenteOption: OptionType[] = [
  { value: "BACKBONE", label: "BACKBONE" },
  { value: "R.A", label: "R.A" },
  { value: "SITE", label: "SITE" },
  { value: "EQUIPAMENTO", label: "EQUIPAMENTO" },
  { value: "LINK", label: "LINK" },
  { value: "EM ANÁLISE", label: "EM ANÁLISE" },
];

const ofensorOption: OptionType[] = [
  { value: "INDISPONIBILIDADE", label: "INDISPONIBILIDADE" },
  { value: "FALHA ELÉTRICA", label: "FALHA ELÉTRICA" },
  { value: "LATÊNCIA ELEVADA", label: "LATÊNCIA ELEVADA" },
  { value: "DEGRADAÇÃO", label: "DEGRADAÇÃO" },
  { value: "MANUTENÇÃO PROGRAMADA", label: "MANUTENÇÃO PROGRAMADA" },
  { value: "INTERMITÊNCIA", label: "INTERMITÊNCIA" },
  { value: "INFORMAÇÃO", label: "INFORMAÇÃO" },
];

const languages: OptionType[] = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
];

type newReportSchemaType = z.infer<typeof newReportSchema>;

interface SelectOfensorProps {
  form: any;
  options: OptionType[];
  fieldName: string;
  formLabel: string;
}

function SelectOfensor({
  form,
  options,
  fieldName,
  formLabel,
}: SelectOfensorProps) {
  return (
    <FormField
      name={fieldName}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Escolha um ` + formLabel} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

function ComboBoxDesignator({
  form,
  formLabel,
  fieldName,
  options,
}: SelectOfensorProps) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formLabel}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="combobox"
                  role="combobox"
                  className={cn(
                    "w-full font-normal justify-between",
                    !field.value
                  )}
                >
                  {field.value
                    ? options.find((language) => language.value === field.value)
                        ?.label
                    : "Select language"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {options.map((language) => (
                    <CommandItem
                      value={language.label}
                      key={language.value}
                      onSelect={() => {
                        form.setValue(fieldName, language.value);
                      }}
                    >
                      {language.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          language.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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
              className="grid grid-cols-3 space-x-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <SelectOfensor
                form={form}
                options={tipoDeIncidenteOption}
                fieldName="tipoDeIncidente"
                formLabel="Tipo de incidente"
              />
              <SelectOfensor
                form={form}
                options={ofensorOption}
                fieldName="ofensor"
                formLabel="Ofensor"
              />
              <ComboBoxDesignator
                form={form}
                fieldName="designador"
                options={languages}
                formLabel="Designação"
              />
              <FormField 
              control={form.control}
              name='inicioDoIncidente'
              render={({field}) => (
                <FormItem>
                    <FormLabel>Inicio do incidente</FormLabel>
                    <DateTimePickerDemo field={field}>
                      
                    </DateTimePickerDemo>
                </FormItem>
              )}
              
              />
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
