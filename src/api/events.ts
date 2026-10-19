import {request} from './client'
import type {Event, RegisterPayload, CreateEventPayload} from '../types/event'
import type {Page} from '../types/page'

export const getEvents = (page = 0, size = 10) =>
    request<Page<Event>>('/events', {params: {page, size}})

export const getUpcomingEvents = (page = 0, size = 10) =>
    request<Page<Event>>('/events/upcoming', {params: {page, size}})

export const getEventById = (id: string) =>
    request<Event>(`/events/${id}`)

export const registerParticipant = (eventId: string, payload: RegisterPayload) =>
    request<void>(`/events/${eventId}/register`, {
        method: 'POST',
        body: payload,
    })

export const createEvent = (payload: CreateEventPayload) =>
    request<Event>('/events', {method: 'POST', body: payload})