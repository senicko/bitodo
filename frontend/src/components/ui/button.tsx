import { cn } from "../../lib/utils";

export function Button({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "bg-neutral-800 w-fit text-white py-2 px-4 rounded-md hover:bg-neutral-700 transition disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
