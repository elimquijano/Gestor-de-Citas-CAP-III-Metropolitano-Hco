import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dayNames = [
  'Lun', 'Mar', 'Mr', 'Jv', 'Vr', 'Sb', 'Do',
]

export {cn};