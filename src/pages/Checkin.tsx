import {Link, useParams} from 'react-router-dom'
import {useCheckIn, useCheckinInfo} from '../hooks/useCheckIn'
import {ApiError} from '../api/client'

export default function CheckIn() {
    const {token = ''} = useParams()
    const {data: info, isLoading, isError} = useCheckinInfo(token)
    const {mutate, isPending, isSuccess, error} = useCheckIn(token)

    if (isLoading) return <p className="p-6">Carregando...</p>
    if (isError || !info)
        return (
            <p className="p-6 text-red-600">Link de check-in inválido ou expirado.</p>
        )

    const errorMessage =
        error instanceof ApiError && error.status === 404
            ? 'Link de check-in inválido ou expirado.'
            : 'Não foi possível confirmar o check-in. Tente novamente.'

    return (
        <main className="mx-auto max-w-xl p-6">
            <h1 className="text-3xl font-bold">{info.eventTitle}</h1>
            <p className="mt-1 text-gray-500">
                {new Date(info.startsAt).toLocaleString('pt-BR', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                })}
            </p>

            <div className="mt-8">
                {info.checkedIn || isSuccess ? (
                    <div className="rounded bg-green-50 p-4 text-green-800">
                        <p className="font-semibold">Check-in confirmado! ✅</p>
                        <p className="mt-1 text-sm">
                            Após o encerramento do evento, você receberá o certificado por
                            e-mail.
                        </p>
                        <Link to="/" className="mt-3 inline-block text-sm text-blue-600">
                            Ver outros eventos
                        </Link>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={() => mutate()}
                            disabled={isPending}
                            className="rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
                        >
                            {isPending ? 'Confirmando...' : 'Fazer check-in'}
                        </button>
                        {error && (
                            <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}