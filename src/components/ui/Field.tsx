import type {ReactNode} from 'react'

interface FieldProps {
  id: string
  label?: string
  error?: string
  children: ReactNode
}

export function Field({id, label, error, children}: FieldProps) {
  return (
    <div className="grid gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-text-secondary">{label}</label>}
      {children}
      {error && <p id={`${id}-error`} className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
