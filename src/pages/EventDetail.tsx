import {ArrowLeft, ArrowUpRight, Ban, CalendarDays, Clock, TicketCheck, Users} from 'lucide-react'
import {useState} from 'react'
import {Link, useParams} from 'react-router-dom'

import RegisterModal from '../components/RegisterModal'
import {Alert} from '../components/ui/Alert'
import {Badge} from '../components/ui/Badge'
import {Button} from '../components/ui/Button'
import {Card, CardBody} from '../components/ui/Card'
import {LoadingScreen} from '../components/ui/Spinner'
import {useEvent} from '../hooks/useEvents'
import {formatDateTime, isFutureDate} from '../lib/dates'
import {routes} from '../lib/routes'

export default function EventDetail() {
  const {id = ''} = useParams()
  const {data: event, isLoading, isError} = useEvent(id)
  const [modalOpen, setModalOpen] = useState(false)

  if (isLoading) return <LoadingScreen message="Carregando evento..."/>
  if (isError || !event)
    return (
      <main className="page-shell">
        <Alert variant="error" title="Evento não encontrado">
          Não foi possível carregar as informações deste evento.
        </Alert>
        <Link to={routes.events} className="back-link mt-6"><ArrowLeft className="size-4"/> Voltar para eventos</Link>
      </main>
    )

  const isUpcoming = isFutureDate(event.date)
  const formatted = formatDateTime(event.date, 'full')

  return (
    <main className="page-shell">
      <Link
        to={routes.events}
        className="back-link"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5"/>
        Voltar para eventos
      </Link>

      <div className="animate-fade-in">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant={isUpcoming ? 'purple' : 'default'}>
            {isUpcoming ? '● Em breve' : 'Encerrado'}
          </Badge>
        </div>

        <h1 className="page-heading max-w-3xl text-text-primary">
          {event.title}
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-surface-2 border border-border px-4 py-2.5">
            <Clock className="size-4 shrink-0 text-purple-400"/>
            <span className="text-sm text-text-secondary">{formatted}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-surface-2 border border-border px-4 py-2.5">
            <Users className="size-4 shrink-0 text-purple-400"/>
            <span className="text-sm text-text-secondary">{event.maxParticipants} participantes</span>
          </div>
        </div>
      </div>

      <div className="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="animate-slide-up">
          <CardBody>
            <div className="mb-6 flex items-center gap-3 border-b border-border pb-5">
              <CalendarDays className="size-5 text-purple-400"/>
              <h2 className="text-lg font-semibold">Sobre o evento</h2>
            </div>
            <p className="whitespace-pre-line text-sm leading-7 text-text-secondary">{event.description}</p>
          </CardBody>
        </Card>
        <aside className="animate-slide-up stagger-2 lg:sticky lg:top-28">
          {isUpcoming ? (
            <Card className="border-purple-500/30">
              <CardBody>
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-purple-600/15"><TicketCheck
                  className="size-5 text-purple-400"/></div>
                <p className="eyebrow mb-2">Sua próxima experiência</p>
                <h2 className="text-xl font-semibold">Faça parte desse encontro</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">Inscreva-se e receba a confirmação com
                  os detalhes por e-mail.</p>
                <div className="my-6 flex items-center gap-2 border-y border-border py-4 text-sm text-text-secondary">
                  <Users className="size-4 text-purple-400"/> Capacidade de {event.maxParticipants} participantes
                </div>
                <Button onClick={() => setModalOpen(true)} size="lg" className="w-full">Quero participar <ArrowUpRight
                  className="size-4"/></Button>
              </CardBody>
            </Card>
          ) : (
            <Alert variant="warning" title="Inscrições encerradas">
              <div className="flex items-start gap-2"><Ban className="mt-1 size-3.5 shrink-0"/> Este evento já
                aconteceu. As inscrições estão encerradas.
              </div>
            </Alert>
          )}
        </aside>
      </div>

      {modalOpen && (
        <RegisterModal
          eventId={event.id}
          eventTitle={event.title}
          onClose={() => setModalOpen(false)}
        />
      )}
    </main>
  )
}
