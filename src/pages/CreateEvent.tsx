import {zodResolver} from '@hookform/resolvers/zod'
import {ArrowLeft, CalendarDays, CheckCircle2, Clock, FileText, Users} from 'lucide-react'
import {Controller, useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'

import {Alert} from '../components/ui/Alert'
import {Button} from '../components/ui/Button'
import {ButtonLink} from '../components/ui/ButtonLink'
import {Card, CardBody} from '../components/ui/Card'
import {DateTimePicker} from '../components/ui/DateTimePicker'
import {Input} from '../components/ui/Input'
import {Textarea} from '../components/ui/Textarea'
import {useCreateEvent} from '../hooks/useEvents'
import {eventPath, routes} from '../lib/routes'
import {type CreateEventFormInput, type CreateEventFormOutput, createEventSchema} from '../schemas/event'

export default function CreateEvent() {
  const navigate = useNavigate()
  const {mutate, isPending, error} = useCreateEvent()
  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CreateEventFormInput, unknown, CreateEventFormOutput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {date: ''},
  })

  const onSubmit = (data: CreateEventFormOutput) => {
    mutate(
      {...data, date: new Date(data.date).toISOString()},
      {
        onSuccess: (created) => navigate(created?.id ? eventPath(created.id) : routes.events),
      },
    )
  }

  return (
    <main className="page-shell">
      <Link to={routes.events} className="back-link">
        <ArrowLeft className="size-4"/> Voltar para eventos
      </Link>
      <div className="mb-9 animate-fade-in">
        <p className="eyebrow mb-3">Organize seu próximo encontro</p>
        <h1 className="page-heading">Criar novo evento</h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Uma boa ideia merece reunir pessoas. Comece pelos detalhes.
        </p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="animate-slide-up">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-7">
              <div className="border-b border-border pb-5">
                <h2 className="flex items-center gap-2 font-semibold">
                  <FileText className="size-4 text-purple-400"/> Informações do evento
                </h2>
                <p className="mt-2 text-xs text-text-secondary">Todos os campos são obrigatórios.</p>
              </div>
              <Input
                id="title"
                label="Título do evento"
                placeholder="Ex: Workshop de React Avançado"
                error={errors.title?.message}
                {...register('title')}
              />
              <Textarea
                id="description"
                label="Descrição"
                rows={5}
                placeholder="Conte sobre o evento e o que os participantes vão aprender..."
                error={errors.description?.message}
                {...register('description')}
              />
              <div className="grid items-start gap-5 sm:grid-cols-2">
                <Controller
                  name="date"
                  control={control}
                  render={({field, fieldState}) => (
                    <DateTimePicker
                      {...field}
                      id="date"
                      label="Data e hora"
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Input
                  id="max"
                  label="Limite de participantes"
                  type="number"
                  min={1}
                  placeholder="Ex: 50"
                  error={errors.maxParticipants?.message}
                  {...register('maxParticipants')}
                />
              </div>
              {error && <Alert variant="error">Não foi possível criar o evento. Tente novamente.</Alert>}
              <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
                <ButtonLink to={routes.events} variant="secondary" size="lg">
                  Cancelar
                </ButtonLink>
                <Button type="submit" loading={isPending} size="lg">
                  <CalendarDays className="size-4"/>
                  {isPending ? 'Criando...' : 'Criar evento'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
        <aside className="rounded-2xl border border-border bg-surface/60 p-6">
          <p className="eyebrow mb-5">Do encontro ao certificado</p>
          <div className="grid gap-6">
            {[
              {
                icon: FileText,
                title: 'Conte sua ideia',
                text: 'Um título claro e uma boa descrição ajudam as pessoas a escolher.'
              },
              {icon: Clock, title: 'Reserve a data', text: 'Escolha quando o encontro vai acontecer.'},
              {
                icon: Users,
                title: 'Reúna as pessoas',
                text: 'Defina a capacidade. O sistema envia o link de check-in aos inscritos.'
              },
              {
                icon: CheckCircle2,
                title: 'Tudo em um lugar',
                text: 'Inscrição, check-in e certificado para quem participa.'
              },
            ].map(({icon: Icon, title, text}) => (
              <div key={title} className="flex gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-purple-400"/>
                <div>
                  <h3 className="text-sm font-medium">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  )
}
