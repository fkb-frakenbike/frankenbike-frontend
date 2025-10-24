import ComponentDetailsWrapper from '@/app/components/detailsForm';

export default async function DetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params; // <-- Important: attendre params avant d'accéder à id

  return <ComponentDetailsWrapper id={id} />;
}
