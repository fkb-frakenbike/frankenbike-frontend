import { PageProps } from '@/.next/types/app/page';
import ComponentDetailsWrapper from '@/app/components/detailsForm';

export default async function DetailsPage({ params }: PageProps) {
  const resolvedParams = params ? await params : {};
  const id = resolvedParams.id;

  return <ComponentDetailsWrapper id={id} />;
}
