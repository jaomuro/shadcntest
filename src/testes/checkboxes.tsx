import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const pon = [
  {
    id: "recents",
    label: "1",
  },
  {
    id: "home",
    label: "2",
  },
  {
    id: "applications",
    label: "3",
  },
  {
    id: "desktop",
    label: "4",
  },
  {
    id: "downloads",
    label: "5",
  },
  {
    id: "documents",
    label: "6",
  },
] as const;

const ponT = [
  {
    id: "recents",
    label: "1",
  },
  {
    id: "home",
    label: "2",
  },
  {
    id: "applications",
    label: "3",
  },
  {
    id: "desktop",
    label: "4",
  },
  {
    id: "downloads",
    label: "5",
  },
  {
    id: "documents",
    label: "6",
  },
] as const;

const FormSchema = z.object({
  ponTotal: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  ponParcial: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});

export function CheckboxReactHookFormMultiple() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onBlur",
    defaultValues: {
      ponTotal: [],
      ponParcial: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-64"
      >
        <FormField
          control={form.control}
          name="ponTotal"
          render={() => (
            <FormItem className="flex items-end justify-between">
              <div>
                <FormLabel className="text-base">Pons totais:</FormLabel>
              </div>
              <div className="flex flex-row space-x-2">
                {pon.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="ponTotal"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-col space-y-1 justify-center items-center"
                        >
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              className="rounded"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ponTotal"
          render={() => (
            <FormItem className="flex items-center  justify-between">
              <div>
                <FormLabel className="text-base">Pons parciais: </FormLabel>
              </div>
              <div className="flex flex-row space-x-2">
                {ponT.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="ponParcial"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-col space-y-1 justify-center items-center"
                        >
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              className="rounded"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
