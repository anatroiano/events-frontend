import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createEvent, getEventById, getEvents, getUpcomingEvents, registerParticipant } from '../api/events'
import { queryKeys } from '../lib/queryKeys'
import type { CreateEventPayload, RegisterPayload } from '../types/event'

export function useEvents(page: number, filter: 'all' | 'upcoming' = 'all') {
  return useQuery({
    queryKey: queryKeys.events.list(filter, page),
    queryFn: () => filter === 'upcoming' ? getUpcomingEvents(page) : getEvents(page),
    placeholderData: keepPreviousData,
  })
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeys.events.detail(id),
    queryFn: () => getEventById(id),
    enabled: !!id,
  })
}

export function useRegister(eventId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerParticipant(eventId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.events.all }),
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => createEvent(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.events.all }),
  })
}
