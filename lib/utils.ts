/**
 * Utilidad para componer clases de CSS.
 *
 * `cn` combina clases condicionales con clsx y luego resuelve con
 * tailwind-merge los conflictos entre utilidades de Tailwind: si dos clases
 * compiten por la misma propiedad, gana la última. Sin esto, escribir
 * `px-2 px-4` dejaría un resultado impredecible.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
