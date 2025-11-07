'use client';

import Timeline from '../components/Timeline';

export default async function TimelinePage({ searchParams }: PageProps<'/timeline'>) {
  const params = searchParams ? await searchParams : {};
  const projectId = params?.projectId ? Number(params.projectId) : undefined;
  return (
    <>
      <Timeline projectId={projectId} />
    </>
  );
}
