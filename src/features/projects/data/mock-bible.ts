import type { BibleBook, BibleVersion } from '../types/project.types';

export const BIBLE_VERSIONS: BibleVersion[] = [
  {
    id: 'RVR1960',
    code: 'RVR1960',
    name: 'Reina-Valera 1960',
    language: 'Español',
    description: 'La versión clásica y tradicional preferida por la comunidad hispana.',
  },
  {
    id: 'NVI',
    code: 'NVI',
    name: 'Nueva Versión Internacional',
    language: 'Español',
    description: 'Traducción moderna y dinámica, ideal para narrativas contemporáneas.',
  },
  {
    id: 'LBLA',
    code: 'LBLA',
    name: 'La Biblia de las Américas',
    language: 'Español',
    description: 'Traducción de alta fidelidad y rigor literal a los textos originales.',
  },
  {
    id: 'NTV',
    code: 'NTV',
    name: 'Nueva Traducción Viviente',
    language: 'Español',
    description: 'Claridad impactante y lenguaje vivo para audiencias jóvenes y devocionales.',
  },
];

export const BIBLE_BOOKS: BibleBook[] = [
  // Antiguo Testamento
  { id: 'GEN', name: 'Génesis', testament: 'ANTIGUO', chaptersCount: 50 },
  { id: 'EXO', name: 'Éxodo', testament: 'ANTIGUO', chaptersCount: 40 },
  { id: 'LEV', name: 'Levítico', testament: 'ANTIGUO', chaptersCount: 27 },
  { id: 'NUM', name: 'Números', testament: 'ANTIGUO', chaptersCount: 36 },
  { id: 'DEU', name: 'Deuteronomio', testament: 'ANTIGUO', chaptersCount: 34 },
  { id: 'JOS', name: 'Josué', testament: 'ANTIGUO', chaptersCount: 24 },
  { id: 'PSA', name: 'Salmos', testament: 'ANTIGUO', chaptersCount: 150 },
  { id: 'PRO', name: 'Proverbios', testament: 'ANTIGUO', chaptersCount: 31 },
  { id: 'ISA', name: 'Isaías', testament: 'ANTIGUO', chaptersCount: 66 },
  { id: 'JER', name: 'Jeremías', testament: 'ANTIGUO', chaptersCount: 52 },
  { id: 'DAN', name: 'Daniel', testament: 'ANTIGUO', chaptersCount: 12 },
  { id: 'JON', name: 'Jonás', testament: 'ANTIGUO', chaptersCount: 4 },

  // Nuevo Testamento
  { id: 'MAT', name: 'Mateo', testament: 'NUEVO', chaptersCount: 28 },
  { id: 'MRK', name: 'Marcos', testament: 'NUEVO', chaptersCount: 16 },
  { id: 'LUK', name: 'Lucas', testament: 'NUEVO', chaptersCount: 24 },
  { id: 'JHN', name: 'Juan', testament: 'NUEVO', chaptersCount: 21 },
  { id: 'ACT', name: 'Hechos', testament: 'NUEVO', chaptersCount: 28 },
  { id: 'ROM', name: 'Romanos', testament: 'NUEVO', chaptersCount: 16 },
  { id: '1CO', name: '1 Corintios', testament: 'NUEVO', chaptersCount: 16 },
  { id: 'EPH', name: 'Efesios', testament: 'NUEVO', chaptersCount: 6 },
  { id: 'PHP', name: 'Filipenses', testament: 'NUEVO', chaptersCount: 4 },
  { id: 'COL', name: 'Colosenses', testament: 'NUEVO', chaptersCount: 4 },
  { id: 'HEB', name: 'Hebreos', testament: 'NUEVO', chaptersCount: 13 },
  { id: 'REV', name: 'Apocalipsis', testament: 'NUEVO', chaptersCount: 22 },
];

export const VISUAL_STYLES = [
  { value: 'cinematic', label: 'Cinematográfico Clásico (Gran Escala y Luz Rembrandt)' },
  { value: 'watercolor', label: 'Acuarela Bíblica Editorial (Tonos Terrosos y Suaves)' },
  { value: 'digital_oil', label: 'Óleo Digital Neoclásico (Textura y Dramatismo)' },
  { value: 'modern_minimal', label: 'Minimalismo Editorial Ilustrado (Línea Fina y Elegante)' },
  { value: 'documentary', label: 'Arqueológico & Realista (Fidelidad Histórica del Cercano Oriente)' },
];

export const NARRATIVE_TONES = [
  { value: 'inspirational', label: 'Inspiracional y Esperanzador' },
  { value: 'reflective', label: 'Reflexivo y Meditativo' },
  { value: 'epic', label: 'Épico y Majestuoso' },
  { value: 'didactic', label: 'Didáctico y Expositivo' },
  { value: 'pastoral', label: 'Pastoral y Cálido' },
];

export const SAMPLE_TEXTS_BY_BOOK: Record<string, string> = {
  Lucas: 'Un hombre tenía dos hijos; y el menor de ellos dijo a su padre: Padre, dame la parte de los bienes que me corresponde; y les repartió los bienes...',
  Salmos: 'Jehová es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará. Confortará mi alma...',
  Génesis: 'En el principio creó Dios los cielos y la tierra. Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo...',
  Juan: 'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios. Este era en el principio con Dios. Todas las cosas por él fueron hechas...',
  Mateo: 'Viendo la multitud, subió al monte; y sentándose, vinieron a él sus discípulos. Y abriendo su boca les enseñaba, diciendo: Bienaventurados los pobres en espíritu...',
  Isaías: '¿No has sabido, no has oído que el Dios eterno es Jehová, el cual creó los confines de la tierra? No desfallece, ni se fatiga con cansancio...',
};

