import { ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { ErrorBoundary } from "react-error-boundary";

type CenteredLayoutProps = {
  className?: string;
} & ComponentProps<"main">;

export function CenteredLayout({
  children,
  className,
  ...props
}: CenteredLayoutProps) {
  return (
    <main
      className={cn("py-32 md:max-w-[640px] md:mx-auto p-4", className)}
      {...props}
    >
      <ErrorBoundary
        fallback={<p>Oh snap! The app broke .. Try again later</p>}
      >
        {children}
      </ErrorBoundary>
    </main>
  );
}
