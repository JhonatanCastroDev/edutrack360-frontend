// Componente de interfaz generado con shadcn/ui (estilo new-york).
// Se construye sobre las primitivas accesibles de Radix UI y se adapta al
// proyecto mediante las variables de color definidas en app/globals.css.
// Se documenta su procedencia para distinguir el código de terceros del
// código propio del proyecto.
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
