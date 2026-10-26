export const queryKeys = {
  events: {
    all: ['events'] as const,
    list: (filter: 'all' | 'upcoming', page: number) => ['events', 'list', filter, page] as const,
    detail: (id: string) => ['events', 'detail', id] as const,
  },
  checkIn: (token: string) => ['checkin', token] as const,
  certificate: (id: string) => ['certificates', id] as const,
}
