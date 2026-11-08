import { useState } from 'react';
import { Card, TextInput, Select, Button, Switch, Avatar, Badge } from '@mantine/core';
import { User, Sparkles, Save } from 'lucide-react';
import { notifications } from '@mantine/notifications';
import { BIBLE_VERSIONS, VISUAL_STYLES } from '@/features/projects/data/mock-bible';

export default function SettingsView() {
  const [name, setName] = useState('Pastor David Morales');
  const email = 'david.morales@bibliastudio.com';
  const [ministry, setMinistry] = useState('Ministerio Gracia y Verdad / Canal Digital');
  const [defaultVersion, setDefaultVersion] = useState('RVR1960');
  const [defaultStyle, setDefaultStyle] = useState('cinematic');
  const [autoSubtitles, setAutoSubtitles] = useState(true);

  const handleSave = () => {
    notifications.show({
      title: 'Ajustes guardados',
      message: 'Tus preferencias creativas y de perfil han sido actualizadas.',
      color: 'forest',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
      <div>
        <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
          Ajustes del Estudio
        </h1>
        <p className="text-sm text-charcoal-muted mt-1">
          Configura tus preferencias de producción, perfil de creador y parámetros predeterminados de IA.
        </p>
      </div>

      {/* Profile Card */}
      <Card radius="xl" p="xl" withBorder className="bg-white border-border-warm space-y-5 shadow-sm">
        <div className="flex items-center gap-2 pb-3 border-b border-border-warm">
          <User size={18} className="text-forest" />
          <h3 className="font-editorial text-base font-bold text-charcoal">
            Perfil de Creador
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5 pb-2">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
            alt={name}
            radius="xl"
            size="xl"
            color="forest"
          />
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-bold text-base text-charcoal">{name}</span>
              <Badge color="forest" variant="light" size="xs">Cuenta Verificada</Badge>
            </div>
            <p className="text-xs text-muted">{email}</p>
            <p className="text-xs text-charcoal-muted">{ministry}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Nombre completo"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <TextInput
            label="Correo electrónico"
            value={email}
            disabled
            description="Vinculado mediante autenticación OAuth"
          />
          <div className="sm:col-span-2">
            <TextInput
              label="Canal, Ministerio u Organización"
              placeholder="Ej: Ministerio Luz a las Naciones"
              value={ministry}
              onChange={(e) => setMinistry(e.currentTarget.value)}
            />
          </div>
        </div>
      </Card>

      {/* AI Production Defaults */}
      <Card radius="xl" p="xl" withBorder className="bg-white border-border-warm space-y-5 shadow-sm">
        <div className="flex items-center gap-2 pb-3 border-b border-border-warm">
          <Sparkles size={18} className="text-gold" />
          <h3 className="font-editorial text-base font-bold text-charcoal">
            Preferencias Predeterminadas de IA
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Versión bíblica por defecto"
            data={BIBLE_VERSIONS.map(v => ({ value: v.code, label: `${v.code} - ${v.name}` }))}
            value={defaultVersion}
            onChange={(val) => val && setDefaultVersion(val)}
          />

          <Select
            label="Estilo visual predominante"
            data={VISUAL_STYLES}
            value={defaultStyle}
            onChange={(val) => val && setDefaultStyle(val)}
          />

          <div className="sm:col-span-2 pt-2 border-t border-border-warm">
            <Switch
              label="Activar incrustación automática de subtítulos editoriales"
              description="Aplica subtítulos con estilo Lora en todas las nuevas exportaciones"
              checked={autoSubtitles}
              color="forest"
              onChange={(e) => setAutoSubtitles(e.currentTarget.checked)}
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            color="forest"
            leftSection={<Save size={16} />}
            onClick={handleSave}
            className="bg-forest hover:bg-forest-dark"
          >
            Guardar preferencias
          </Button>
        </div>
      </Card>
    </div>
  );
}
