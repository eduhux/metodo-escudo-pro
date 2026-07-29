import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KIWIFY_CHECKOUT_URL } from "@/lib/config";

export function BuyButton({
  children = "Comprar Agora",
  showArrow = true,
  className,
  ...props
}: ButtonProps & { showArrow?: boolean }) {
  return (
    <Button
      asChild
      size="lg"
      className={cn("cta-energy", className)}
      {...props}
    >
      <a href={KIWIFY_CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
        {children}
        {showArrow && <ArrowRight />}
      </a>
    </Button>
  );
}
