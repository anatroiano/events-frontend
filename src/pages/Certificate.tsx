import {Link, useParams} from 'react-router-dom'
import {useDownloadCertificate} from '../hooks/useCertificates'
import {ApiError} from '../api/client'

export default function Certificate() {
    const {id = ''} = useParams()
    const {mutate, data, isPending, isSuccess, error} =
        useDownloadCertificate(id)

    const errorMessage =
        error instanceof ApiError && error.status === 404
            ? 'Certificado não encontrado. Verifique o link.'
            : 'Não foi possível baixar o certificado. Tente novamente.'

    return (
        <main className="mx-auto max-w-xl p-6">
            <h1 className="text-3xl font-bold">Seu certificado</h1>
            <p className="mt-2 text-gray-600">
                Clique no botão abaixo para baixar o certificado em PDF.
            </p>

            <button
                onClick={() => mutate()}
                disabled={isPending}
                className="mt-6 rounded bg-blue-600 px-6 py-2 text-white disabled:opacity-50"
            >
                {isPending ? 'Baixando...' : 'Baixar certificado'}
            </button>

            {isSuccess && data === 'ready' && (
                <p className="mt-4 rounded bg-green-50 p-3 text-green-800">
                    Download iniciado! ✅
                </p>
            )}

            {isSuccess && data === 'pending' && (
                <p className="mt-4 rounded bg-yellow-50 p-3 text-yellow-800">
                    Seu certificado ainda está sendo gerado. Tente novamente em alguns
                    instantes.
                </p>
            )}

            {error && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}

            <Link to="/" className="mt-8 block text-sm text-blue-600">
                Ver outros eventos
            </Link>
        </main>
    )
}