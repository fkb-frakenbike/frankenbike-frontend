import AddComponentForm from '../components/AddComponentForm';

export default async function AddComponentPage({
  searchParams,
}: {
  searchParams?: { projectId?: string };
}) {
  const projectId = searchParams?.projectId ? Number(searchParams.projectId) : undefined;
  return (
    <div className="fkb-bg min-h-screen p-3 px-4 pt-44">
      <AddComponentForm projectId={projectId} />
    </div>
  );
}
