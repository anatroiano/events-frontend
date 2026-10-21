import type {HTMLAttributes} from 'react'

import {cn} from '../../lib/utils'

function Card({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'min-w-0 rounded-2xl border border-border bg-surface shadow-sm shadow-black/20',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 pt-5 sm:px-8 sm:pt-8', className)} {...props} />
}

function CardBody({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 sm:p-8', className)} {...props} />
}

function CardFooter({className, ...props}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center px-5 pb-5 sm:px-8 sm:pb-8', className)}
      {...props}
    />
  )
}

export {Card, CardHeader, CardBody, CardFooter}
