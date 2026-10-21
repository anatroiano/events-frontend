import * as PopoverPrimitive from '@radix-ui/react-popover'
import type {ComponentProps} from 'react'

import {cn} from '../../lib/utils'

export function Popover(props: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root {...props} />
}

export function PopoverTrigger(props: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger {...props} />
}

export function PopoverContent({
                                 className,
                                 align = 'start',
                                 sideOffset = 8,
                                 ...props
                               }: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        collisionPadding={16}
        className={cn(
          'z-50 max-h-[var(--radix-popover-content-available-height)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-border-light bg-surface shadow-2xl shadow-black/40 outline-none',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
