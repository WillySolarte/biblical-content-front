import { useState } from 'react';
import { Card, Badge, Button } from '@mantine/core';
import { BookOpen, Sparkles, Copy, Check, Bookmark } from 'lucide-react';
import type { Project } from '../../types/project.types';
import { notifications } from '@mantine/notifications';

interface TabPassagesProps {
  project: Project;
  onNextStage?: () => void;
}

export default function TabPassages({ project, onNextStage }: TabPassagesProps) {
  const [copied, setCopied] = useState(false);

  const copyScripture = () => {
    const text = project.passages.map(p => `${p.book} ${p.chapter}:${p.verseStart}-${p.verseEnd}: ${p.sampleText || ''}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    notifications.show({
      title: 'Texto copiado',
      message: 'El pasaje bíblico ha sido copiado al portapapeles.',
      color: 'forest',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Overview & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-border-warm">
        <div>
          <h3 className="font-editorial text-lg font-semibold text-charcoal flex items-center gap-2">
            <BookOpen size={18} className="text-gold" />
            Fundamento Escritural del Proyecto
          </h3>
          <p className="text-xs text-charcoal-muted">
            Versión: <strong className="text-forest">{project.bibleVersion}</strong> • {project.passages.length} pasajes seleccionados
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="default"
            leftSection={copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            onClick={copyScripture}
          >
            {copied ? 'Copiado' : 'Copiar texto'}
          </Button>

          {onNextStage && (
            <Button
              size="xs"
              color="forest"
              rightSection={<Sparkles size={14} />}
              onClick={onNextStage}
            >
              Continuar al Storyboard
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Scripture Reader */}
        <div className="lg:col-span-2 space-y-4">
          {project.passages.map((passage, index) => (
            <Card key={passage.id} radius="xl" p="xl" withBorder className="bg-white border-border-warm shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-warm">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-forest-subtle text-forest text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="font-editorial text-xl font-bold text-forest">
                    {passage.book} {passage.chapter}:{passage.verseStart}{passage.verseEnd > passage.verseStart ? `-${passage.verseEnd}` : ''}
                  </span>
                </div>
                <Badge variant="outline" color="forest" size="sm">
                  {project.bibleVersion}
                </Badge>
              </div>

              {/* Biblical Text Render */}
              <div className="space-y-4 font-serif text-base text-charcoal leading-relaxed pl-2 border-l-2 border-gold">
                {passage.book === 'Lucas' && passage.chapter === 15 ? (
                  <>
                    <p>
                      <sup className="font-sans text-xs text-muted mr-1.5 font-bold">11</sup>
                      También dijo: Un hombre tenía dos hijos;
                    </p>
                    <p>
                      <sup className="font-sans text-xs text-muted mr-1.5 font-bold">12</sup>
                      y el menor de ellos dijo a su padre: Padre, dame la parte de los bienes que me corresponde; y les repartió los bienes.
                    </p>
                    <p>
                      <sup className="font-sans text-xs text-muted mr-1.5 font-bold">13</sup>
                      No muchos días después, juntándolo todo el hijo menor, se fue lejos a una provincia apartada; y allí desperdició sus bienes viviendo perdidamente.
                    </p>
                    <p>
                      <sup className="font-sans text-xs text-muted mr-1.5 font-bold">14</sup>
                      Y cuando todo lo hubo malgastado, vino una gran hambre en aquella provincia, y comenzó a faltarle.
                    </p>
                    <p>
                      <sup className="font-sans text-xs text-muted mr-1.5 font-bold">20</sup>
                      Y levantándose, vino a su padre. Y cuando aún estaba lejos, lo vio su padre, y fue movido a misericordia, y corrió, y se echó sobre su cuello, y le besó.
                    </p>
                  </>
                ) : (
                  <p className="italic text-charcoal-muted">
                    "{passage.sampleText || 'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios. Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho.'}"
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Right: Linguistic & Exegetical Insights */}
        <div className="space-y-4">
          <Card radius="xl" p="lg" withBorder className="bg-ivory-light border-border-warm">
            <h4 className="font-editorial text-base font-semibold text-forest mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-gold" />
              Términos clave en el texto original
            </h4>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-border-warm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-forest">σπλαγχνίζομαι (splanchnizomai)</span>
                  <Badge size="xs" color="gold">Griego</Badge>
                </div>
                <p className="text-xs text-charcoal-muted leading-tight">
                  "Movido a compasión entrañable". Amor visceral y profundo que impulsa al padre a correr.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-border-warm">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-forest">χάρις (charis)</span>
                  <Badge size="xs" color="forest">Griego</Badge>
                </div>
                <p className="text-xs text-charcoal-muted leading-tight">
                  Favor inmerecido, gracia soberana que acoge al hijo sin exigir condiciones previas.
                </p>
              </div>
            </div>
          </Card>

          <Card radius="xl" p="lg" withBorder className="bg-white border-border-warm">
            <h4 className="font-editorial text-base font-semibold text-charcoal mb-2 flex items-center gap-2">
              <Bookmark size={16} className="text-forest" />
              Pasajes cruzados recomendados
            </h4>
            <ul className="text-xs text-charcoal-muted space-y-2 list-disc list-inside">
              <li><strong className="text-forest">Efesios 2:4-5:</strong> Dios, que es rico en misericordia...</li>
              <li><strong className="text-forest">Miqueas 7:18:</strong> ¿Qué Dios como tú, que perdona la maldad?</li>
              <li><strong className="text-forest">Salmos 103:13:</strong> Como el padre se compadece de los hijos...</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
