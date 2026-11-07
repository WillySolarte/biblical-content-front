import {z} from 'zod'

export const StandarResponseSchema = z.object({
    status: z.number(),
    message: z.string(),
    data: z.null()
}).strict();

export type StandardResponse = z.infer<typeof StandarResponseSchema>;