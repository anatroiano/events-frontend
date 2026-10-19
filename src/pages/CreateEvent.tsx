import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {useCreateEvent} from '../hooks/useEvents'

const schema = z.object({
    title: z.string().min(3, 'Informe um título (mín. 3 caracteres)'),
    description: z.string().min(1, 'Informe uma descrição'),
    maxParticipants: z.coerce
        .number({message: 'Informe um número'})
        .int('Deve ser um número inteiro')
        .min(1, 'Mínimo de 1 participante'),
    date: z
        .string()
        .min(1, 'Informe a data e hora')
        .refine((v) => new Date(v) > new Date(), 'A data deve ser no futuro'),
})

type FormInput = z.input<typeof schema>
type FormOutput = z.output<typeof schema>

export default function CreateEvent() {
    const navigate = useNavigate()
    const {mutate, isPending, error} = useCreateEvent()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormInput, unknown, FormOutput>({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: FormOutput) => {
        mutate(
            {...data, date: new Date(data.date).toISOString()},
            {
                onSuccess: (created) => navigate(created?.id ? `/events/${created.id}` : '/'),
            },
        )
    }

    return (
        <main className="mx-auto max-w-xl p-6">
            <Link to="/" className="text-sm text-blue-600">← Voltar</Link>
            <h1 className="mt-4 mb-6 text-3xl font-bold">Novo evento</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div>
                    <label htmlFor="title" className="mb-1 block text-sm">Título</label>
                    <input id="title" className="w-full rounded border p-2" {...register('title')} />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="mb-1 block text-sm">Descrição</label>
                    <textarea
                        id="description"
                        rows={4}
                        className="w-full rounded border p-2"
                        {...register('description')}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="date" className="mb-1 block text-sm">Data e hora</label>
                        <input
                            id="date"
                            type="datetime-local"
                            className="w-full rounded border p-2"
                            {...register('date')}
                        />
                        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="max" className="mb-1 block text-sm">Máx. de participantes</label>
                        <input
                            id="max"
                            type="number"
                            min={1}
                            className="w-full rounded border p-2"
                            {...register('maxParticipants')}
                        />
                        {errors.maxParticipants && (
                            <p className="mt-1 text-sm text-red-600">{errors.maxParticipants.message}</p>
                        )}
                    </div>
                </div>

                {error && (
                    <p className="text-sm text-red-600">
                        Não foi possível criar o evento. Tente novamente.
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
                >
                    {isPending ? 'Criando...' : 'Criar evento'}
                </button>
            </form>
        </main>
    )
}