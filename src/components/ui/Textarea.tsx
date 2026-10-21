import {forwardRef, type TextareaHTMLAttributes, useId} from 'react'

import {cn} from '../../lib/utils'
import {Field} from './Field'
import {fieldStyles} from './fieldStyles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, label, error, id, 'aria-describedby': describedBy, ...props}, ref) => {
    const generatedId = useId()
    const fieldId = id ?? generatedId
    const description = [describedBy, error ? `${fieldId}-error` : undefined].filter(Boolean).join(' ')

    return (
      <Field id={fieldId} label={label} error={error}>
        <textarea
          {...props}
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={description || undefined}
          className={fieldStyles(error, cn('resize-y', className))}
        />
      </Field>
    )
  },
)

Textarea.displayName = 'Textarea'

export {Textarea}
