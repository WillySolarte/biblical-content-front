//React

//Libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Textarea, Card } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
//My resources
import type { TCreateProjectForm } from '../types/project.types';
import { CreateProjectFormSchema } from '../schemas/project.schema';
import flashy from '@pablotheblink/flashyjs';
import { createInitProject } from '../services/project.service';
import { useNavigate } from 'react-router-dom';
import { routes } from '@/common/constants/routes';
import { queryKeys } from '@/common/constants/query-keys';




export default function CreateProjectWizard() {
  const defaultValues: TCreateProjectForm = {
    name: '',
    description: ''
  };
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TCreateProjectForm>({ defaultValues: defaultValues, resolver: zodResolver(CreateProjectFormSchema) });

  const { mutate } = useMutation({
    mutationFn: createInitProject,
    onError: (error) => {
      flashy.error(error.message, { position: 'top-center', animation: 'bounce' })
    },
    onSuccess: (dataOutput) => {
      reset()
      navigate(routes.app.projects, { replace: true })
      queryClient.invalidateQueries({queryKey: queryKeys.projects.all})
      flashy.success(dataOutput.message, { animation: 'bounce', position: 'top-center' });
    },
  })
  function createProject(formData: TCreateProjectForm) {
    mutate(formData)
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      <Card radius="xl" p="xl" withBorder className="bg-white border-border-warm shadow-sm">
        <form onSubmit={handleSubmit(createProject)} noValidate>
          <div className="space-y-6">
            <div>
              <h2 className="font-editorial text-2xl font-semibold text-charcoal">
                Define la identidad de tu proyecto
              </h2>
              <p className="text-sm text-charcoal-muted mt-1">
                Establece el nombre, propósito y dirección artística de la producción.
              </p>
            </div>

            <div className="space-y-4">
              {/* Mantine leerá automáticamente la string de error y detendrá el submit */}
              <TextInput
                label="Nombre del proyecto"
                description="Un título evocador para tu video o producción audiovisual"
                placeholder="Ej: El Hijo Pródigo: La Gracia Incondicional"
                required
                size="md"
                {...register('name')}
                spellCheck
                autoCorrect="on"
                autoCapitalize="sentences"
                lang="es"
                error={errors.name?.message}
              />

              <Textarea
                label="Descripción u objetivo del proyecto (opcional)"
                placeholder="Describe brevemente la intención pedagógica o devocional de este contenido..."
                rows={3}
                {...register('description')}
                spellCheck
                autoCorrect="on"
                autoCapitalize="sentences"
                lang="es"
                error={errors.description?.message}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="bg-forest hover:bg-forest-dark text-white w-50 rounded-md h-9 cursor-pointer">
              Crear proyecto
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
