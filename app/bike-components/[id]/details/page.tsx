import ComponentDetailsWrapper from '@/app/components/detailsForm';

export default async function DetailsPage({ params }: PageProps<'/bike-components/[id]/details'>) {
  const resolvedParams = params ? await params : {};
  const id = (resolvedParams as { id: string }).id;

  return <ComponentDetailsWrapper id={id} />;
}
