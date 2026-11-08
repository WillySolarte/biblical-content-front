import { z } from 'zod';

export const PassageRangeSchema = z.object({
  id: z.string(),
  book: z.string().min(1, 'Selecciona un libro'),
  chapter: z.number().int().positive('Capítulo debe ser mayor a 0'),
  verseStart: z.number().int().positive('Versículo inicial debe ser mayor a 0'),
  verseEnd: z.number().int().positive('Versículo final debe ser mayor a 0'),
  sampleText: z.string().optional(),
}).refine(data => data.verseEnd >= data.verseStart, {
  message: 'El versículo final no puede ser menor que el inicial',
  path: ['verseEnd'],
});

export const CreateProjectSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(100, 'El título no puede exceder 100 caracteres'),
  description: z.string().max(500, 'La descripción no puede exceder 500 caracteres').optional(),
  bibleVersion: z.string().min(1, 'Selecciona una versión bíblica'),
  visualStyle: z.string().min(1, 'Selecciona un estilo visual'),
  tone: z.string().min(1, 'Selecciona un tono narrativo'),
  aspectRatio: z.enum(['16:9', '9:16', '1:1']),
  passages: z.array(PassageRangeSchema).min(1, 'Debes agregar al menos un pasaje bíblico'),
});

export type TCreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type TPassageRangeInput = z.infer<typeof PassageRangeSchema>;

