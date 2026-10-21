import {CalendarDays, CheckCircle2, Clock, ExternalLink} from 'lucide-react'
import {Link, useParams} from 'react-router-dom'

import {ApiError} from '../api/client'
import {Alert} from '../components/ui/Alert'
import {Button} from '../components/ui/Button'
import {ButtonLink} from '../components/ui/ButtonLink'
import {Card, CardBody} from '../components/ui/Card'
import {LoadingScreen} from '../components/ui/Spinner'
import {useCheckIn, useCheckInInfo} from '../hooks/useCheckIn'
import {formatDateTime} from '../lib/dates'
import {routes} from '../lib/routes'

export default function CheckIn() {
  const {token = ''} = useParams()
  const {data: info, isLoading, isError} = useCheckInInfo(token)
  const {mutate, isPending, isSuccess, error} = useCheckIn(token)

  if (isLoading) return <LoadingScreen message="Verificando link de check-in..."/>
  if (isError || !info)
    return (
      <main className="page-shell max-w-xl flex flex-col items-center text-center gap-5">
        <div className="size-16 rounded-2xl bg-red-900/20 border border-red-800/40 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <Alert variant="error" title="Link inválido">
          Link de check-in inválido ou expirado.
        </Alert>
        <Link to={routes.events} className="text-sm text-purple-300 hover:text-purple-200">Voltar para eventos</Link>
      </main>
    )

  const errorMessage =
    error instanceof ApiError && error.status === 404
      ? 'Link de check-in inválido ou expirado.'
      : 'Não foi possível confirmar o check-in. Tente novamente.'

  const formatted = formatDateTime(info.startsAt, 'full')

  const checkedIn = info.checkedIn || isSuccess

  return (
    <main className="page-shell max-w-xl animate-fade-in">
      <div className="text-center mb-9">
        <div
          className="inline-flex size-16 items-center justify-center rounded-2xl bg-purple-600/20 border border-purple-600/30 mb-5">
          <CalendarDays className="size-8 text-purple-400"/>
        </div>
        <p className="eyebrow mb-3">Confirme sua presença</p>
        <h1 className="page-heading text-text-primary leading-tight">
          {info.eventTitle}
        </h1>
        <div
          className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full bg-surface-2 border border-border px-4 py-1.5 text-sm text-text-secondary">
          <Clock className="size-3.5 shrink-0 text-purple-400"/>
          {formatted}
        </div>
      </div>

      <Card>
        <CardBody>
          {checkedIn ? (
            <div className="flex flex-col items-center text-center gap-4 py-4 animate-slide-up">
              <div
                className="size-16 rounded-full bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center">
                <CheckCircle2 className="size-8 text-emerald-400"/>
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary">Check-in confirmado!</h2>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  Após o encerramento do evento, você receberá o certificado por e-mail.
                </p>
              </div>
              <ButtonLink to={routes.events} variant="outline" size="md" className="mt-2">
                <ExternalLink className="size-3.5"/> Ver outros eventos
              </ButtonLink>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-5 py-4">
              <p className="text-sm text-text-secondary leading-relaxed">
                Clique no botão abaixo para confirmar sua presença neste evento.
              </p>
              <Button
                onClick={() => mutate()}
                loading={isPending}
                size="lg"
                className="w-full"
              >
                <CheckCircle2 className="size-4"/>
                {isPending ? 'Confirmando...' : 'Fazer check-in'}
              </Button>
              {error && (
                <Alert variant="error" className="w-full text-left">
                  {errorMessage}
                </Alert>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </main>
  )
}
