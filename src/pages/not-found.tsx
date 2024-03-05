import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] gap-2 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          It looks like you're lost.
        </p>
      </div>
      <Button variant={"link"} asChild>
        <Link to="/login">Go Back</Link>
      </Button>
    </div>
  );
}
