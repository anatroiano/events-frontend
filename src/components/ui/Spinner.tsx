import {cn} from '../../lib/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {sm: 'size-4', md: 'size-6', lg: 'size-10'}

function Spinner({className, size = 'md'}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Carregando"
      className={cn(
        'inline-block rounded-full border-2 border-border border-t-purple-500 animate-spin',
        sizes[size],
        className,
      )}
    />
  )
}

function LoadingScreen({message = 'Carregando...'}: { message?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 animate-fade-in">
      <Spinner size="lg"/>
      <p className="text-sm text-text-secondary">{message}</p>
    </div>
  )
}

export {Spinner, LoadingScreen}
