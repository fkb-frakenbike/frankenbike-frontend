import { PageProps } from '@/.next/types/app/page';
import AddComponentForm from '../components/AddComponentForm';

export default async function AddComponentPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const projectId = params?.projectId ? Number(params.projectId) : undefined;
  return (
    <div className="fkb-bg min-h-screen p-3 px-4 pt-44">
      <AddComponentForm projectId={projectId} />
    </div>
  );
}
