export const routes = {
  events: '/',
  createEvent: '/new',
  eventDetail: '/events/:id',
  checkIn: '/checkin/:token',
  certificate: '/certificates/:id',
}

export function eventPath(id: string) {
  return `/events/${encodeURIComponent(id)}`
}
