import type {CreateEventPayload, Event, RegisterPayload} from '../types/event'
import type {Page} from '../types/page'
import {request} from './client'

const DEFAULT_PAGE_SIZE = 9

export const getEvents = (page = 0, size = DEFAULT_PAGE_SIZE) =>
  request<Page<Event>>('/events', {params: {page, size}})

export const getUpcomingEvents = (page = 0, size = DEFAULT_PAGE_SIZE) =>
  request<Page<Event>>('/events/upcoming', {params: {page, size}})

export const getEventById = (id: string) =>
  request<Event>(`/events/${encodeURIComponent(id)}`)

export const registerParticipant = (eventId: string, payload: RegisterPayload) =>
  request<void>(`/events/${encodeURIComponent(eventId)}/register`, {
    method: 'POST',
    body: payload,
  })

export const createEvent = (payload: CreateEventPayload) =>
  request<Event>('/events', {method: 'POST', body: payload})
