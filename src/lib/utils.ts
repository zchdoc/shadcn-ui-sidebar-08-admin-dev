import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isLocalEnvironment(): boolean {
  if (typeof window === 'undefined') return false

  const hostname = window.location.hostname
  return hostname === 'localhost' || hostname === '127.0.0.1'
}
