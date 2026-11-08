import { Button } from '@mantine/core';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateProjectWizard from '../components/CreateProjectWizard';
import { routes } from '@/common/constants/routes';

export default function CreateProjectView() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 max-w-5xl mx-auto py-2">
      <div className="flex items-center gap-3">
        <Button
          variant="subtle"
          color="gray"
          size="sm"
          leftSection={<ArrowLeft size={16} />}
          onClick={() => navigate(routes.app.projects)}
          className="text-[#555E57] hover:text-[#263B35]"
        >
          Volver a Mis Proyectos
        </Button>
      </div>

      <CreateProjectWizard />
    </div>
  );
}

