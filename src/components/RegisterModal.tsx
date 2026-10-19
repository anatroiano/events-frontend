import {useEffect, useRef} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {useRegister} from '../hooks/useEvents'
import {ApiError} from '../api/client'

const schema = z.object({
    participantName: z.string().min(2, 'Informe seu nome'),
    participantEmail: z.string().email('E-mail inválido'),
})
type FormData = z.infer<typeof schema>

function errorMessage(error: unknown) {
    if (error instanceof ApiError) {
        if (error.status === 404) return 'Evento não encontrado.'
        if (error.status === 409)
            return 'Você já está inscrito neste evento ou as vagas esgotaram.'
    }
    return 'Não foi possível concluir a inscrição. Tente novamente.'
}

interface Props {
    eventId: string
    eventTitle: string
    onClose: () => void
}

export default function RegisterModal({eventId, eventTitle, onClose}: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const {mutate, isPending, isSuccess, error} = useRegister(eventId)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({resolver: zodResolver(schema)})

    useEffect(() => {
        const dialog = dialogRef.current
        if (dialog && !dialog.open) dialog.showModal()
    }, [])

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose} // dispara também ao apertar Esc
            className="m-auto w-full max-w-md rounded-lg p-6 backdrop:bg-black/50"
        >
            {isSuccess ? (
                <div>
                    <h2 className="mb-2 text-xl font-bold">Inscrição confirmada! 🎉</h2>
                    <p className="mb-4 text-gray-600">
                        Enviamos um e-mail de confirmação para você.
                    </p>
                    <button
                        onClick={() => dialogRef.current?.close()}
                        className="rounded bg-blue-600 px-4 py-2 text-white"
                    >
                        Fechar
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit((data) => mutate(data))} className="grid gap-4">
                    <h2 className="text-xl font-bold">Inscrição: {eventTitle}</h2>

                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm">Nome</label>
                        <input
                            id="name"
                            className="w-full rounded border p-2"
                            {...register('participantName')}
                        />
                        {errors.participantName && (
                            <p className="mt-1 text-sm text-red-600">{errors.participantName.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full rounded border p-2"
                            {...register('participantEmail')}
                        />
                        {errors.participantEmail && (
                            <p className="mt-1 text-sm text-red-600">{errors.participantEmail.message}</p>
                        )}
                    </div>

                    {error && <p className="text-sm text-red-600">{errorMessage(error)}</p>}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => dialogRef.current?.close()}
                            className="rounded bg-gray-100 px-4 py-2"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                        >
                            {isPending ? 'Enviando...' : 'Confirmar inscrição'}
                        </button>
                    </div>
                </form>
            )}
        </dialog>
    )
}