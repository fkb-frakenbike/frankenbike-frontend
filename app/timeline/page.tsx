import Timeline from '../components/Timeline';

export default async function TimelinePage({ searchParams }: PageProps<'/timeline'>) {
  const params = searchParams ? await searchParams : {};
  const projectId = typeof params?.projectId === 'string' && params.projectId ? params.projectId : undefined;
  return (
    <>
      <Timeline projectId={projectId} />
    </>
  );
}
