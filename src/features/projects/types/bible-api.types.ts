import type z from "zod";
import type { BibleVersionApiSchema } from "../schemas/bible-version.schema";


export type TBibleVersionApi = z.infer<typeof BibleVersionApiSchema>

export const BibleVersionDescription: Record<string, string> = {
    JER: 'Traducción católica erudita y literaria, famosa por sus exhaustivas notas a pie de página.',
    rva: 'Revisión evangélica moderna con lenguaje contemporáneo, basada en los textos bíblicos originales más antiguos.',
    rvr: 'Revisión clásica protestante de estilo solemne y tradicional, muy querida por su riqueza literaria.'
}