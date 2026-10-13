import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 py-24 md:py-32", className)}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <span className="eyebrow text-[0.7rem] text-primary">{eyebrow}</span>
      )}
      <h2 className="mt-4 text-[2rem] leading-[1.04] md:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
