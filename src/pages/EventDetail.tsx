import {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useEvent} from '../hooks/useEvents'
import RegisterModal from '../components/RegisterModal'

export default function EventDetail() {
    const {id = ''} = useParams()
    const {data: event, isLoading, isError} = useEvent(id)
    const [modalOpen, setModalOpen] = useState(false)

    if (isLoading) return <p className="p-6">Carregando...</p>
    if (isError || !event) return <p className="p-6 text-red-600">Evento não encontrado.</p>

    const isUpcoming = new Date(event.date) > new Date()

    return (
        <main className="mx-auto max-w-3xl p-6">
            <Link to="/" className="text-sm text-blue-600">← Voltar</Link>

            <h1 className="mt-4 text-3xl font-bold">{event.title}</h1>
            <p className="mt-1 text-gray-500">
                {new Date(event.date).toLocaleString('pt-BR', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                })}
            </p>
            <p className="mt-4 whitespace-pre-line">{event.description}</p>
            <p className="mt-4 text-sm">Capacidade: {event.maxParticipants} participantes</p>

            <div className="mt-6">
                {isUpcoming ? (
                    <button
                        onClick={() => setModalOpen(true)}
                        className="rounded bg-blue-600 px-6 py-2 text-white"
                    >
                        Se inscrever
                    </button>
                ) : (
                    <p className="rounded bg-gray-100 p-3 text-gray-600">
                        Este evento já aconteceu. As inscrições estão encerradas.
                    </p>
                )}
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