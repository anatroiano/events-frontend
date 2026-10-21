import {CalendarDays, ChevronDown, Clock} from 'lucide-react'
import {forwardRef, useId, useState} from 'react'

import {formatDateTime} from '../../lib/dates'
import {cn} from '../../lib/utils'
import {Button} from './Button'
import {Calendar} from './Calendar'
import {Field} from './Field'
import {Input} from './Input'
import {Popover, PopoverContent, PopoverTrigger} from './Popover'
import {fieldStyles} from './fieldStyles'

function getEarliestDate() {
  return new Date((Math.floor(Date.now() / 60_000) + 1) * 60_000)
}

function formatTime(date: Date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

interface DateTimePickerProps {
  id?: string
  name?: string
  label?: string
  value?: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  disabled?: boolean
}

const DateTimePicker = forwardRef<HTMLButtonElement, DateTimePickerProps>(
  ({id, name, label, value = '', onChange, onBlur, error, disabled}, ref) => {
    const generatedId = useId()
    const fieldId = id ?? generatedId
    const [open, setOpen] = useState(false)
    const [preferredTime, setPreferredTime] = useState('09:00')
    const selectedDate = value ? new Date(value) : undefined
    const selectedTime = value.split('T')[1]?.slice(0, 5) || preferredTime
    const earliestDate = getEarliestDate()
    const firstAvailableDay = new Date(
      earliestDate.getFullYear(),
      earliestDate.getMonth(),
      earliestDate.getDate(),
    )
    const minimumTime = selectedDate?.toDateString() === earliestDate.toDateString()
      ? formatTime(earliestDate)
      : undefined

    function updateDateTime(date: Date, time: string) {
      const [hours, minutes] = time.split(':').map(Number)
      const candidate = new Date(date)
      candidate.setHours(hours, minutes, 0, 0)
      const minimumDate = getEarliestDate()
      const nextDate = candidate < minimumDate ? minimumDate : candidate
      const year = nextDate.getFullYear()
      const month = String(nextDate.getMonth() + 1).padStart(2, '0')
      const day = String(nextDate.getDate()).padStart(2, '0')
      const nextTime = formatTime(nextDate)

      setPreferredTime(nextTime)
      onChange(`${year}-${month}-${day}T${nextTime}`)
    }

    function selectDate(date: Date) {
      updateDateTime(date, selectedTime)
    }

    function selectTime(time: string) {
      if (!time || !selectedDate) return
      updateDateTime(selectedDate, time)
    }

    function confirmDateTime() {
      if (!selectedDate) return
      updateDateTime(selectedDate, selectedTime)
      setOpen(false)
    }

    return (
      <Field id={fieldId} label={label} error={error}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              ref={ref}
              id={fieldId}
              name={name}
              type="button"
              disabled={disabled}
              onBlur={onBlur}
              aria-invalid={!!error}
              aria-describedby={error ? `${fieldId}-error` : undefined}
              className={fieldStyles(
                error,
                'flex items-center gap-3 text-left disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              <CalendarDays className="size-4 shrink-0 text-purple-400"/>
              <span className={cn('flex-1', !value && 'text-text-placeholder')}>
                {value ? formatDateTime(value) : 'Selecione data e hora'}
              </span>
              <ChevronDown
                className={cn(
                  'size-4 shrink-0 text-text-muted transition-transform',
                  open && 'rotate-180',
                )}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent aria-label="Escolher data e hora">
            <Calendar
              mode="single"
              required
              selected={selectedDate}
              onSelect={selectDate}
              defaultMonth={selectedDate ?? firstAvailableDay}
              startMonth={firstAvailableDay}
              disabled={{before: firstAvailableDay}}
              autoFocus
            />
            <div className="grid gap-4 border-t border-border p-4">
              <div className="flex items-center gap-3">
                <Clock className="size-4 shrink-0 text-purple-400"/>
                <div className="flex-1">
                  <Input
                    id={`${fieldId}-time`}
                    label="Horário do evento"
                    type="time"
                    value={selectedTime}
                    min={minimumTime}
                    disabled={!selectedDate}
                    aria-describedby={minimumTime ? `${fieldId}-time-hint` : undefined}
                    onChange={(event) => selectTime(event.target.value)}
                    className="py-2"
                  />
                  {minimumTime && (
                    <p id={`${fieldId}-time-hint`} className="mt-2 text-xs text-text-secondary">
                      Horário mínimo para hoje: {minimumTime}.
                    </p>
                  )}
                </div>
              </div>
              <Button
                disabled={!value}
                className="w-full"
                onClick={confirmDateTime}
              >
                Confirmar data e hora
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </Field>
    )
  },
)

DateTimePicker.displayName = 'DateTimePicker'

export {DateTimePicker}
