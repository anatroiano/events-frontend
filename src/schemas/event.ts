import {z} from 'zod'

import {isFutureDate} from '../lib/dates'

export const createEventSchema = z.object({
  title: z.string()
    .min(3, 'Informe um título (mín. 3 caracteres)')
    .max(255, 'O título deve ter no máximo 255 caracteres'),
  description: z.string()
    .min(1, 'Informe uma descrição')
    .max(2000, 'A descrição deve ter no máximo 2000 caracteres'),
  maxParticipants: z.coerce
    .number({message: 'Informe um número'})
    .int('Deve ser um número inteiro')
    .min(1, 'Mínimo de 1 participante'),
  date: z.string().min(1, 'Informe a data e hora').refine(isFutureDate, 'Escolha uma data e um horário posteriores ao momento atual'),
})

export type CreateEventFormInput = z.input<typeof createEventSchema>
export type CreateEventFormOutput = z.output<typeof createEventSchema>
