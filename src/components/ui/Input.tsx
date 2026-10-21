import {forwardRef, type InputHTMLAttributes, useId} from 'react'

import {Field} from './Field'
import {fieldStyles} from './fieldStyles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({className, label, error, id, 'aria-describedby': describedBy, ...props}, ref) => {
    const generatedId = useId()
    const fieldId = id ?? generatedId
    const description = [describedBy, error ? `${fieldId}-error` : undefined].filter(Boolean).join(' ')

    return (
      <Field id={fieldId} label={label} error={error}>
        <input
          {...props}
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={description || undefined}
          className={fieldStyles(error, className)}
        />
      </Field>
    )
  },
)

Input.displayName = 'Input'

export {Input}
