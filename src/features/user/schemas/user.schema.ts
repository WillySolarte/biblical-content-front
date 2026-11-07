import { z } from 'zod'

export const UserActiveSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    photo: z.string().nullable().optional(),
    role: z.string(),
}).strict();

export const UserActiveResponseSchema = z.object({
    status: z.number(),
    message: z.string(),
    data: UserActiveSchema
}).strict()