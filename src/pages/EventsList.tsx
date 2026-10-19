import {useState} from 'react'
import {Link} from 'react-router-dom'
import {useEvents, useUpcomingEvents} from '../hooks/useEvents'

export default function EventsList() {
    const [tab, setTab] = useState<'upcoming' | 'all'>('upcoming')
    const [page, setPage] = useState(0)

    const upcoming = useUpcomingEvents(page)
    const all = useEvents(page)
    const {data, isLoading, isError, error} = tab === 'upcoming' ? upcoming : all

    const changeTab = (t: 'upcoming' | 'all') => {
        setTab(t)
        setPage(0)
    }

    return (
        <main className="mx-auto max-w-4xl p-6">
            <h1 className="mb-6 text-3xl font-bold">Eventos</h1>

            <div className="mb-6 flex gap-2">
                {(['upcoming', 'all'] as const).map((t) => (
                    <button
                        key={t}
                        onClick={() => changeTab(t)}
                        className={`rounded px-4 py-2 ${
                            tab === t ? 'bg-blue-600 text-white' : 'bg-gray-100'
                        }`}
                    >
                        {t === 'upcoming' ? 'Próximos' : 'Todos'}
                    </button>
                ))}
            </div>

            {isLoading && <p>Carregando...</p>}
            {isError && <p className="text-red-600">{error.message}</p>}
            {data?.empty && <p>Nenhum evento encontrado.</p>}

            <ul className="grid gap-4">
                {data?.content.map((event) => (
                    <li key={event.id} className="rounded border p-4 shadow-sm">
                        <Link to={`/events/${event.id}`}>
                            <h2 className="text-xl font-semibold">{event.title}</h2>
                            <p className="text-sm text-gray-500">
                                {new Date(event.date).toLocaleString('pt-BR', {
                                    dateStyle: 'long',
                                    timeStyle: 'short',
                                })}
                            </p>
                            <p className="mt-2 line-clamp-2">{event.description}</p>
                            <p className="mt-2 text-sm">Vagas: {event.maxParticipants}</p>
                        </Link>
                    </li>
                ))}
            </ul>

            {data && data.totalPages > 1 && (
                <div className="mt-6 flex items-center gap-4">
                    <button
                        disabled={data.first}
                        onClick={() => setPage((p) => p - 1)}
                        className="rounded bg-gray-100 px-3 py-1 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span>
                        Página {data.number + 1} de {data.totalPages}
                    </span>
                    <button
                        disabled={data.last}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded bg-gray-100 px-3 py-1 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            )}
        </main>
    )
}