const dateTimeFormatters = {
  medium: new Intl.DateTimeFormat('pt-BR', {dateStyle: 'medium', timeStyle: 'short'}),
  full: new Intl.DateTimeFormat('pt-BR', {dateStyle: 'full', timeStyle: 'short'}),
}

export function formatDateTime(value: string, style: keyof typeof dateTimeFormatters = 'medium') {
  return dateTimeFormatters[style].format(new Date(value))
}

export function isFutureDate(value: string) {
  return new Date(value).getTime() > Date.now()
}
