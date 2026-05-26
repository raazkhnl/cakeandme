import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  contained?: boolean;
};

export function Section({
  eyebrow,
  title,
  description,
  contained = true,
  className,
  children,
  ...rest
}: Props) {
  return (
    <section className={cn("relative py-24 md:py-32", className)} {...rest}>
      {contained ? (
        <div className="container-page">
          {(eyebrow || title || description) && (
            <header className="mb-12 max-w-3xl">
              {eyebrow && <span className="chip-secondary mb-4">{eyebrow}</span>}
              {title && (
                <h2 className="font-display text-display-lg text-balance text-foreground">{title}</h2>
              )}
              {description && (
                <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">{description}</p>
              )}
            </header>
          )}
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
