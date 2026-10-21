import {CalendarDays, Plus, Sparkles} from 'lucide-react'
import {Link, useLocation} from 'react-router-dom'

import {routes} from '../lib/routes'
import {cn} from '../lib/utils'

export default function Navbar() {
  const {pathname} = useLocation()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-8">
        <Link
          to={routes.events}
          className="flex items-center gap-2.5 group"
        >
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-purple-600/20 border border-purple-600/40 group-hover:bg-purple-600/30 transition-colors">
            <Sparkles className="size-4 text-purple-400"/>
          </div>
          <span className="text-base font-bold text-text-primary tracking-tight">
            Eventos
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="flex items-center gap-2">
          <Link
            to={routes.events}
            aria-label="Eventos"
            aria-current={pathname === routes.events ? 'page' : undefined}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
              pathname === routes.events
                ? 'bg-purple-600/20 text-purple-300 border border-purple-600/40'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-2',
            )}
          >
            <CalendarDays className="size-4"/>
            <span className="hidden sm:inline">Eventos</span>
          </Link>

          <Link
            to={routes.createEvent}
            aria-label="Novo evento"
            aria-current={pathname === routes.createEvent ? 'page' : undefined}
            className={cn(
              'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
              pathname === routes.createEvent
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                : 'bg-purple-600/20 text-purple-300 border border-purple-600/40 hover:bg-purple-600/30',
            )}
          >
            <Plus className="size-4"/>
            <span>Novo evento</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
