import {Award, Download, ExternalLink, Loader2} from 'lucide-react'
import {Link, useParams} from 'react-router-dom'

import {ApiError} from '../api/client'
import {EventCard} from '../components/events/EventCard'
import {Alert} from '../components/ui/Alert'
import {Button} from '../components/ui/Button'
import {ButtonLink} from '../components/ui/ButtonLink'
import {Card, CardBody} from '../components/ui/Card'
import {LoadingScreen, Spinner} from '../components/ui/Spinner'
import {useCertificate, useDownloadCertificate} from '../hooks/useCertificates'
import {useEvents} from '../hooks/useEvents'
import {getApiErrorMessage} from '../lib/apiErrors'
import {formatDateTime} from '../lib/dates'
import {routes} from '../lib/routes'

export default function Certificate() {
  const {id = ''} = useParams()
  const {data: certificate, isLoading, isError, error: certificateError} = useCertificate(id)
  const {mutate, data, isPending, isSuccess, error} = useDownloadCertificate(id)
  const {
    data: upcomingEvents,
    isLoading: isLoadingEvents,
    isError: isEventsError,
    refetch: refetchEvents,
  } = useEvents(0, 'upcoming')

  if (isLoading) return <LoadingScreen message="Carregando dados do certificado..."/>

  if (isError || !certificate) {
    return (
      <main className="page-shell max-w-xl flex flex-col items-center gap-5 text-center">
        <Alert variant="error" title="Não foi possível carregar o certificado">
          {certificateError instanceof ApiError && certificateError.status === 404
            ? 'Certificado não encontrado. Verifique o link.'
            : getApiErrorMessage(
              certificateError,
              'Não foi possível carregar os dados do certificado. Tente novamente.',
            )}
        </Alert>
        <Link to={routes.events} className="back-link">Voltar para eventos</Link>
      </main>
    )
  }

  const errorMessage =
    error instanceof ApiError && error.status === 404
      ? 'Certificado não encontrado. Verifique o link.'
      : 'Não foi possível baixar o certificado. Tente novamente.'

  return (
    <main className="page-shell max-w-5xl animate-fade-in">
      <div className="mx-auto max-w-xl text-center mb-9">
        <div
          className="inline-flex size-16 items-center justify-center rounded-2xl bg-purple-600/20 border border-purple-600/30 mb-5">
          <Award className="size-8 text-purple-400"/>
        </div>
        <p className="eyebrow mb-3">Uma conquista para guardar</p>
        <h1 className="page-heading text-text-primary break-words">
          Olá, {certificate.participantName}!
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Baixe seu certificado de participação do evento{' '}
          <strong className="font-semibold text-text-primary break-words">
            {certificate.eventName}
          </strong> em PDF.
        </p>
      </div>

      <Card className="mx-auto max-w-xl">
        <CardBody className="flex flex-col items-center gap-6 py-8">
          <div
            className="relative w-full rounded-xl border border-border-light bg-linear-to-br from-surface-3 to-surface flex flex-col items-center justify-center px-6 py-12 gap-4">
            {isPending ? (
              <Loader2 className="size-10 text-purple-400 animate-spin"/>
            ) : (
              <Award className="size-12 text-purple-300"/>
            )}
            <span className="eyebrow">Participação</span>
            <p className="w-full break-words text-center font-semibold text-text-primary">
              {certificate.eventName}
            </p>
            <p className="text-center text-sm text-text-secondary">
              Emitido em:{' '}
              <time dateTime={certificate.issuedAt}>{formatDateTime(certificate.issuedAt)}</time>
            </p>
            <p className="text-sm text-text-secondary">
              {isPending ? 'Gerando PDF...' : 'Seu certificado em PDF'}
            </p>
          </div>

          <Button
            onClick={() => mutate()}
            loading={isPending}
            size="lg"
            className="w-full"
          >
            <Download className="size-4"/>
            {isPending ? 'Baixando...' : 'Baixar certificado'}
          </Button>

          {isSuccess && data === 'ready' && (
            <Alert variant="success" title="Download iniciado!" className="w-full animate-slide-up">
              Seu certificado foi baixado com sucesso.
            </Alert>
          )}

          {isSuccess && data === 'pending' && (
            <Alert variant="warning" title="Certificado sendo gerado" className="w-full animate-slide-up">
              Seu certificado ainda está sendo processado. Tente novamente em alguns instantes.
            </Alert>
          )}

          {error && (
            <Alert variant="error" className="w-full animate-slide-up">
              {errorMessage}
            </Alert>
          )}
        </CardBody>
      </Card>

      <section aria-labelledby="upcoming-events-heading" className="mt-12 border-t border-border pt-9">
        <div className="mb-6">
          <p className="eyebrow mb-3">Seu próximo encontro</p>
          <h2 id="upcoming-events-heading" className="text-2xl font-semibold text-text-primary">
            Continue aprendendo com a gente
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Confira os próximos eventos e escolha de qual você quer participar.
          </p>
        </div>

        {isLoadingEvents ? (
          <div className="flex items-center justify-center gap-3 py-8">
            <Spinner/>
            <p className="text-sm text-text-secondary">Carregando próximos eventos...</p>
          </div>
        ) : isEventsError ? (
          <Alert variant="error">
            <p>Não foi possível carregar os próximos eventos.</p>
            <Button variant="secondary" className="mt-3" onClick={() => refetchEvents()}>
              Tentar novamente
            </Button>
          </Alert>
        ) : upcomingEvents?.content.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.content.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event}/>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-border bg-surface p-6 text-sm text-text-secondary">
            Ainda não há próximos eventos. Volte em breve para conferir as novidades!
          </p>
        )}

        <div className="mt-6 flex justify-center">
          <ButtonLink to={routes.events} variant="secondary">
            <ExternalLink className="size-4"/>
            Explorar eventos
          </ButtonLink>
        </div>
      </section>
    </main>
  )
}
