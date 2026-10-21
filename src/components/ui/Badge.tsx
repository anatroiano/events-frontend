import type {ReactNode} from 'react'

import {cn} from '../../lib/utils'

type BadgeVariant = 'default' | 'purple' | 'success' | 'warning' | 'error'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-3 text-text-secondary border border-border',
  purple: 'bg-purple-600/20 text-purple-300 border border-purple-600/40',
  success: 'bg-emerald-900/30 text-emerald-300 border border-emerald-800/40',
  warning: 'bg-amber-900/30 text-amber-300 border border-amber-800/40',
  error: 'bg-red-900/30 text-red-300 border border-red-800/40',
}

function Badge({variant = 'default', children, className}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export {Badge}
