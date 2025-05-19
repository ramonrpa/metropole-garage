import originalClsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const clsx = (...inputs: ClassValue[]) => twMerge(originalClsx(inputs))
