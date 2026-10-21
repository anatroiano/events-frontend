import type {VariantProps} from 'class-variance-authority'
import {Link, type LinkProps} from 'react-router-dom'

import {cn} from '../../lib/utils'
import {buttonVariants} from './buttonVariants'

interface ButtonLinkProps extends LinkProps, VariantProps<typeof buttonVariants> {
}

export function ButtonLink({variant, size, className, ...props}: ButtonLinkProps) {
  return <Link {...props} className={cn(buttonVariants({variant, size}), className)}/>
}
