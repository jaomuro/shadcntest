 
import * as React from "react";
import { format } from "date-fns";
import {  CalendarIcon } from "@radix-ui/react-icons";
 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "@/components/time-picker-demo";
 
export function DateTimePickerDemo({field}: any) {
//   const [date, setDate] = React.useState<Date>();
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {field.value ? format(field.value, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={field.onChange} date={field.value} />
        </div>
      </PopoverContent>
    </Popover>
  );
}