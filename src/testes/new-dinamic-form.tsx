import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

const validationSchema = z.object({
  affectedAcessNetwork: z.array(
    z.object({
      lamNumber: z.number(),
      affectedPon: z.array(
        z.object({
          ponNumber: z.number(),
          isTotalAffected: z.boolean(),
        })
      ),
    })
  ),
});

type FormValues = z.infer<typeof validationSchema>;

export function NewDinamicForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      affectedAcessNetwork: [
        {
          lamNumber: 0,
          affectedPon: [{ ponNumber: 0, isTotalAffected: false }],
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    name: "affectedAcessNetwork",
    control: form.control,
  });

  const onSubmit = (values: FormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <>
      <h1>New form</h1>
    </>
  );
}
