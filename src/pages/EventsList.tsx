import {CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, Zap} from 'lucide-react'
import {useState} from 'react'
import {Link} from 'react-router-dom'

import {EventCard} from '../components/events/EventCard'
import {Alert} from '../components/ui/Alert'
import {Button} from '../components/ui/Button'
import {LoadingScreen} from '../components/ui/Spinner'
import {useEvents} from '../hooks/useEvents'
import {routes} from '../lib/routes'
import {cn} from '../lib/utils'

type Tab = 'upcoming' | 'all'

export default function EventsList() {
  const [tab, setTab] = useState<Tab>('upcoming')
  const [page, setPage] = useState(0)

  const {data, isLoading, isError, error, isPlaceholderData} = useEvents(page, tab)

  const changeTab = (nextTab: Tab) => {
    setTab(nextTab)
    setPage(0)
  }

  return (
    <main className="page-shell">
      <div
        className="mb-10 flex flex-col justify-between gap-6 rounded-3xl border border-border bg-surface p-6 sm:p-10 lg:flex-row lg:items-end animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex size-2 rounded-full bg-purple-400 animate-pulse-glow"/>
            <span className="text-xs font-medium uppercase tracking-widest text-purple-400">
              Plataforma de Eventos
            </span>
          </div>
          <h1 className="page-heading max-w-xl text-text-primary">
            Descubra eventos{' '}
            <span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent">
              incríveis
            </span>
          </h1>
          <p className="mt-2 text-text-secondary">
            Encontre seu próximo encontro. Aprenda, compartilhe e conecte-se.
          </p>
        </div>
        <Link to={routes.createEvent}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-border-light bg-surface-3 px-5 py-3 text-sm font-medium text-purple-200 transition-colors hover:bg-border">
          <Plus className="size-4"/> Criar um evento
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-border pb-5 animate-fade-in stagger-1">
        {(['upcoming', 'all'] as const).map((eventTab) => (
          <button
            key={eventTab}
            onClick={() => changeTab(eventTab)}
            aria-pressed={tab === eventTab}
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
              tab === eventTab
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                : 'bg-surface text-text-secondary border border-border hover:border-border-light hover:text-text-primary',
            )}
          >
            {eventTab === 'upcoming' ? (
              <>
                <Zap className="size-3.5"/>
                Próximos
              </>
            ) : (
              <>
                <Clock className="size-3.5"/>
                Todos
              </>
            )}
          </button>
        ))}
        {data && !isError && <span
          className="ml-auto text-xs text-text-secondary">{data.totalElements} {data.totalElements === 1 ? 'evento' : 'eventos'}</span>}
      </div>

      {isLoading && <LoadingScreen message="Buscando eventos..."/>}
      {isError && (
        <Alert variant="error" title="Erro ao carregar eventos" className="animate-fade-in">
          {error.message}
        </Alert>
      )}
      {!isLoading && !isError && data?.empty && (
        <div
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-light bg-surface px-6 py-16 text-center gap-4 animate-fade-in">
          <div className="size-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center">
            <CalendarDays className="size-7 text-border-light"/>
          </div>
          <h2 className="text-lg font-semibold">Nenhum evento por aqui ainda</h2>
          <p
            className="max-w-sm text-text-secondary text-sm">{tab === 'upcoming' ? 'Confira todos os eventos ou crie um novo encontro para a comunidade.' : 'Que tal organizar o primeiro encontro?'}</p>
          <Link to={routes.createEvent} className="text-sm font-medium text-purple-300 hover:text-purple-200">Criar um
            evento <span aria-hidden="true">→</span></Link>
        </div>
      )}

      {!isLoading && !isError && data && !data.empty && (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.content.map((event, index) => (
            <li
              key={event.id}
              className={cn('animate-slide-up', `stagger-${Math.min(index + 1, 4)}`)}
            >
              <EventCard event={event}/>
            </li>
          ))}
        </ul>
      )}

      {data && data.totalPages > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
          <Button
            variant="secondary"
            size="sm"
            disabled={data.first || isPlaceholderData}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="size-4"/>
            Anterior
          </Button>
          <span className="text-sm text-text-secondary">
            Página <strong className="text-text-primary">{data.number + 1}</strong> de{' '}
            <strong className="text-text-primary">{data.totalPages}</strong>
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={data.last || isPlaceholderData}
            onClick={() => setPage((p) => p + 1)}
          >
            Próxima
            <ChevronRight className="size-4"/>
          </Button>
        </div>
      )}
    </main>
  )
}
