import {ChevronLeft, ChevronRight} from 'lucide-react'
import type {ComponentProps} from 'react'
import {DayPicker} from 'react-day-picker'
import {ptBR} from 'react-day-picker/locale'

import {cn} from '../../lib/utils'

export function Calendar({className, ...props}: ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays
      fixedWeeks
      className={cn('event-calendar p-4', className)}
      components={{
        Chevron: ({orientation, className: chevronClassName}) =>
          orientation === 'left' ? (
            <ChevronLeft className={cn('size-4', chevronClassName)}/>
          ) : (
            <ChevronRight className={cn('size-4', chevronClassName)}/>
          ),
      }}
      {...props}
    />
  )
}
