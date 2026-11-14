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

//Book

export const BookByVersionSchema = z.object({
    id: z.string(),
    name: z.string(),
    testament: z.string(),
}).strict()

export const BibleBooksSchema = z.object({
    count: z.number(),
    books: z.array(BookByVersionSchema)
}).strict()

export const BibleBooksSchemaResponse = z.object({
    status: z.number(),
    message: z.string(),
    data: BibleBooksSchema
}).strict()
    


