export interface Event {
    id: string
    title: string
    description: string
    date: string
    maxParticipants: number
    certificateRequestsSent: boolean
}

export interface RegisterPayload {
    participantName: string
    participantEmail: string
}

export interface CreateEventPayload {
    title: string
    description: string
    date: string
    maxParticipants: number
}