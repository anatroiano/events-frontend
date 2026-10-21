import {zodResolver} from '@hookform/resolvers/zod'
import {CheckCircle2, TicketCheck, X} from 'lucide-react'
import {useEffect, useRef} from 'react'
import {useForm} from 'react-hook-form'

import {ApiError} from '../api/client'
import {useRegister} from '../hooks/useEvents'
import {type RegistrationFormData, registrationSchema} from '../schemas/registration'
import {Alert} from './ui/Alert'
import {Button} from './ui/Button'
import {Input} from './ui/Input'

function resolveError(error: unknown) {
  if (error instanceof ApiError && error.message.trim()) return error.message

  return 'Não foi possível concluir a inscrição. Tente novamente.'
}

interface RegisterModalProps {
  eventId: string
  eventTitle: string
  onClose: () => void
}

export default function RegisterModal({eventId, eventTitle, onClose}: RegisterModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const {mutate, isPending, isSuccess, error} = useRegister(eventId)
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegistrationFormData>({resolver: zodResolver(registrationSchema)})

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="register-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-0 shadow-2xl shadow-black/60 backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-slide-up"
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div
            className="flex size-8 items-center justify-center rounded-lg bg-purple-600/20 border border-purple-600/30">
            <TicketCheck className="size-4 text-purple-400"/>
          </div>
          <h2 id="register-title" className="text-base font-semibold text-text-primary">
            {isSuccess ? 'Inscrição confirmada' : 'Inscrever-se'}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Fechar inscrição"
          onClick={() => dialogRef.current?.close()}
          className="flex size-8 items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-3 transition-all cursor-pointer"
        >
          <X className="size-4"/>
        </button>
      </div>

      <div className="px-6 py-6">
        {isSuccess ? (
          <div className="flex flex-col items-center text-center gap-5 py-4 animate-slide-up">
            <div
              className="size-16 rounded-full bg-emerald-900/30 border border-emerald-700/40 flex items-center justify-center">
              <CheckCircle2 className="size-8 text-emerald-400"/>
            </div>
            <div>
              <p className="text-lg font-bold text-text-primary">Inscrição confirmada! 🎉</p>
              <p className="mt-1.5 text-sm text-text-secondary">
                Enviamos um e-mail de confirmação para você.
              </p>
            </div>
            <Button
              onClick={() => dialogRef.current?.close()}
              variant="secondary"
              className="mt-2"
            >
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit((data) => mutate(data))} className="grid gap-5">
            <p className="text-sm text-text-secondary leading-relaxed">
              Preencha seus dados para se inscrever em{' '}
              <strong className="text-text-primary font-medium">{eventTitle}</strong>.
            </p>

            <Input
              id="modal-name"
              label="Nome completo"
              autoComplete="name"
              placeholder="Seu nome"
              error={errors.participantName?.message}
              {...register('participantName')}
            />
            <Input
              id="modal-email"
              label="E-mail"
              type="email"
              autoComplete="email"
              placeholder="seu@email.com"
              error={errors.participantEmail?.message}
              {...register('participantEmail')}
            />

            {error && (
              <Alert variant="error">{resolveError(error)}</Alert>
            )}

            <div className="flex items-center gap-3 pt-1">
              <Button type="submit" loading={isPending} className="flex-1">
                {isPending ? 'Enviando...' : 'Confirmar inscrição'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => dialogRef.current?.close()}
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  )
}
