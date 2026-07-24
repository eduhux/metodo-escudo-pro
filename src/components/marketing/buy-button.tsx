import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { KIWIFY_CHECKOUT_URL } from "@/lib/config";

export function BuyButton({
  children = "Comprar Agora",
  showArrow = true,
  ...props
}: ButtonProps & { showArrow?: boolean }) {
  return (
    <Button asChild size="lg" {...props}>
      <a href={KIWIFY_CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
        {children}
        {showArrow && <ArrowRight />}
      </a>
    </Button>
  );
}
