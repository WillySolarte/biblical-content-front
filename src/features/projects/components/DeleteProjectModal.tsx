import { Modal, Button, Group } from '@mantine/core';
import { AlertTriangle } from 'lucide-react';
import type { projectDataDelete } from '../types/project.types';

interface DeleteProjectModalProps {
  opened: boolean;
  onClose: () => void;
  projectData: projectDataDelete | null
}

export default function DeleteProjectModal({ opened, onClose, projectData }: DeleteProjectModalProps) {

  function handleDelete(){
    console.log(projectData)
  }

  return (
    <Modal opened={opened} onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-red-600 font-semibold font-editorial">
          <AlertTriangle size={20} />
          <span>Confirmar eliminación de proyecto</span>
        </div>
      }
      centered
      size="md"
    >
      <div className="space-y-4">
        <p className="text-sm text-charcoal-muted leading-relaxed">
          ¿Estás seguro de que deseas eliminar permanentemente el proyecto{' '}
          <strong className="text-charcoal">" {projectData?.name} "</strong>?
        </p>

        <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-xs text-red-800">
          Esta acción eliminará todos los pasajes seleccionados, el guion generado por IA, las escenas del storyboard y las configuraciones audiovisuales asociadas.
        </div>

        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="red" onClick={handleDelete}>
            Eliminar definitivamente
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
