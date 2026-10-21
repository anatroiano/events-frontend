import {z} from 'zod'

export const registrationSchema = z.object({
  participantName: z.string().min(2, 'Informe seu nome'),
  participantEmail: z.string().email('E-mail inválido'),
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
