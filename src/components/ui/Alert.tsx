import type {HTMLAttributes} from 'react'

import {cn} from '../../lib/utils'

type AlertVariant = 'info' | 'success' | 'warning' | 'error'

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
}

const styles: Record<AlertVariant, { wrapper: string; dot: string }> = {
  info: {wrapper: 'bg-purple-900/20 border-purple-700/40 text-purple-200', dot: 'bg-purple-400'},
  success: {wrapper: 'bg-emerald-900/20 border-emerald-700/40 text-emerald-200', dot: 'bg-emerald-400'},
  warning: {wrapper: 'bg-amber-900/20 border-amber-700/40 text-amber-200', dot: 'bg-amber-400'},
  error: {wrapper: 'bg-red-900/20 border-red-700/40 text-red-300', dot: 'bg-red-400'},
}

function Alert({variant = 'info', title, children, className, ...props}: AlertProps) {
  const style = styles[variant]
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-lg border p-4 text-sm', style.wrapper, className)}
      {...props}
    >
      <span className={cn('mt-0.5 size-2 shrink-0 rounded-full self-start', style.dot)}/>
      <div className="grid gap-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  )
}

export {Alert}
