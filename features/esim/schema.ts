import { z } from 'zod'

export const esimOrderSchema = z.object({
  package_id: z.string().min(1, 'Select a package'),
  quantity: z.coerce.number().min(1).max(10).default(1),
  email: z.string().email('Enter a valid email'),
  full_name: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  type: z.enum(['local', 'global']),
  sandbox: z.boolean().optional(),
})

export type EsimOrderValues = z.infer<typeof esimOrderSchema>
