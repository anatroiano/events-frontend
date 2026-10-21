import {Award, Download, ExternalLink, Loader2} from 'lucide-react'
import {Link, useParams} from 'react-router-dom'

import {ApiError} from '../api/client'
import {Alert} from '../components/ui/Alert'
import {Button} from '../components/ui/Button'
import {Card, CardBody} from '../components/ui/Card'
import {useDownloadCertificate} from '../hooks/useCertificates'
import {routes} from '../lib/routes'

export default function Certificate() {
  const {id = ''} = useParams()
  const {mutate, data, isPending, isSuccess, error} = useDownloadCertificate(id)

  const errorMessage =
    error instanceof ApiError && error.status === 404
      ? 'Certificado não encontrado. Verifique o link.'
      : 'Não foi possível baixar o certificado. Tente novamente.'

  return (
    <main className="page-shell max-w-xl animate-fade-in">
      <div className="text-center mb-9">
        <div
          className="inline-flex size-16 items-center justify-center rounded-2xl bg-purple-600/20 border border-purple-600/30 mb-5">
          <Award className="size-8 text-purple-400"/>
        </div>
        <p className="eyebrow mb-3">Uma conquista para guardar</p>
        <h1 className="page-heading text-text-primary">Seu certificado</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Baixe seu certificado de participação em PDF.
        </p>
      </div>

      <Card>
        <CardBody className="flex flex-col items-center gap-6 py-8">
          <div
            className="relative w-full rounded-xl border border-border-light bg-linear-to-br from-surface-3 to-surface flex flex-col items-center justify-center px-6 py-12 gap-4">
            {isPending ? (
              <Loader2 className="size-10 text-purple-400 animate-spin"/>
            ) : (
              <Award className="size-12 text-purple-300"/>
            )}
            <span className="eyebrow">Participação</span>
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

          <Link
            to={routes.events}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-purple-300 transition-colors"
          >
            <ExternalLink className="size-3.5"/>
            Ver outros eventos
          </Link>
        </CardBody>
      </Card>
    </main>
  )
}
