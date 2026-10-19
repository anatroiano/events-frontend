import {keepPreviousData, useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {createEvent, getEventById, getEvents, getUpcomingEvents, registerParticipant} from '../api/events'
import type {CreateEventPayload, RegisterPayload} from '../types/event'

export const useEvents = (page: number) =>
    useQuery({
        queryKey: ['events', 'all', page],
        queryFn: () => getEvents(page),
        placeholderData: keepPreviousData,
    })

export const useUpcomingEvents = (page: number) =>
    useQuery({
        queryKey: ['events', 'upcoming', page],
        queryFn: () => getUpcomingEvents(page),
        placeholderData: keepPreviousData,
    })

export const useEvent = (id: string) =>
    useQuery({
        queryKey: ['events', id],
        queryFn: () => getEventById(id),
        enabled: !!id,
    })

export const useRegister = (eventId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: RegisterPayload) => registerParticipant(eventId, payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['events']}),
    })
}

export const useCreateEvent = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: CreateEventPayload) => createEvent(payload),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['events']}),
    })
}