import {cn} from '../../lib/utils'

export function fieldStyles(error?: string, className?: string) {
  return cn(
    'min-w-0 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text-primary placeholder-text-placeholder',
    'transition-colors duration-200 hover:border-border-light',
    'focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20',
    error && 'border-red-700/70 focus:border-red-500 focus:ring-red-500/20',
    className,
  )
}
