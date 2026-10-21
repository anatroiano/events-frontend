import {cva} from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-purple-600 text-white shadow-lg shadow-purple-900/40 hover:bg-purple-500 hover:shadow-purple-700/50 active:scale-[0.97]',
        secondary:
          'bg-surface-3 text-text-primary border border-border hover:bg-border hover:border-border-light active:scale-[0.97]',
        ghost:
          'text-text-secondary hover:text-text-primary hover:bg-surface-2 active:scale-[0.97]',
        danger:
          'bg-red-900/40 text-red-300 border border-red-800/50 hover:bg-red-900/60 active:scale-[0.97]',
        success:
          'bg-emerald-900/40 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/60 active:scale-[0.97]',
        outline:
          'border border-purple-600/60 text-purple-300 hover:bg-purple-600/10 hover:border-purple-500 active:scale-[0.97]',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-7 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
