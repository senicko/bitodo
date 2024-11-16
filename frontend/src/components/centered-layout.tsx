import { ComponentProps } from "react";
import { cn } from "../lib/utils";

type CenteredLayoutProps = {
  className?: string;
} & ComponentProps<"main">;

export function CenteredLayout({ className, ...props }: CenteredLayoutProps) {
  return (
    <main
      className={cn("py-32 md:max-w-[640px] md:mx-auto p-4", className)}
      {...props}
    />
  );
}
