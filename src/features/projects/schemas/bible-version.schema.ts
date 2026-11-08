import { z } from 'zod'

export const BibleVersionApiSchema = z.object({
    id: z.string(),
    name: z.string(),
    copyright: z.string()
})

export const BibleVersionsApiResponseSchema = z.object({
    status: z.number(),
    message: z.string(),
    data: z.array(BibleVersionApiSchema)
}).strict()
    


