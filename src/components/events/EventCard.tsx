import {ArrowUpRight, CalendarDays, Clock, Users} from 'lucide-react'
import {Link} from 'react-router-dom'

import {formatDateTime, isFutureDate} from '../../lib/dates'
import {eventPath} from '../../lib/routes'
import type {Event} from '../../types/event'
import {Badge} from '../ui/Badge'
import {Card} from '../ui/Card'

interface EventCardProps {
  event: Event
}

export function EventCard({event}: EventCardProps) {
  const isUpcoming = isFutureDate(event.date)

  return (
    <Link to={eventPath(event.id)} className="block h-full group">
      <Card
        className="flex h-full flex-col p-6 transition-all duration-300 hover:border-purple-600/50 hover:shadow-purple-900/20 hover:shadow-2xl group-hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple-600/15 border border-purple-600/25">
            <CalendarDays className="size-5 text-purple-400"/>
          </div>
          <Badge variant={isUpcoming ? 'purple' : 'default'}>
            {isUpcoming ? 'Em breve' : 'Encerrado'}
          </Badge>
        </div>

        <h2
          className="text-lg font-semibold text-text-primary leading-snug group-hover:text-purple-200 transition-colors line-clamp-2">
          {event.title}
        </h2>

        <p className="mt-2 text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-6">
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Clock className="size-3.5 shrink-0 text-purple-500"/>
            {formatDateTime(event.date)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Users className="size-3.5 shrink-0 text-purple-500"/>
            {event.maxParticipants} vagas
          </div>
        </div>
        <div
          className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs font-medium text-purple-300">
          Ver detalhes <ArrowUpRight
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>
        </div>
      </Card>
    </Link>
  )
}
