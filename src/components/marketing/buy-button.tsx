"use client";

import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { usePromo } from "@/hooks/use-promo";
import { checkoutUrl } from "@/lib/promo";
import { cn } from "@/lib/utils";

/**
 * Botão de compra. Aponta para o checkout certo (promo x normal) e,
 * quando `promoLabel` é informado, troca o texto durante a promoção.
 */
export function BuyButton({
  children = "Comprar Agora",
  promoLabel,
  showArrow = true,
  className,
  ...props
}: ButtonProps & { showArrow?: boolean; promoLabel?: React.ReactNode }) {
  const { ativa } = usePromo();
  const label = ativa && promoLabel ? promoLabel : children;

  return (
    <Button
      asChild
      size="lg"
      className={cn("cta-energy", className)}
      {...props}
    >
      <a href={checkoutUrl(ativa)} target="_blank" rel="noopener noreferrer">
        {label}
        {showArrow && <ArrowRight />}
      </a>
    </Button>
  );
}
