import type {VariantProps} from 'class-variance-authority'
import {type ButtonHTMLAttributes, forwardRef} from 'react'

import {cn} from '../../lib/utils'
import {Spinner} from './Spinner'
import {buttonVariants} from './buttonVariants'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, loading, children, disabled, type = 'button', ...props}, ref) => (
    <button
      ref={ref}
      type={type}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({variant, size}), className)}
      {...props}
    >
      {loading && <Spinner size="sm" className="border-current border-t-transparent"/>}
      {children}
    </button>
  ),
)

Button.displayName = 'Button'

export {Button}
