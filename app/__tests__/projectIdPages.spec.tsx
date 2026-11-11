import React from 'react';
import TimelinePage from '../timeline/page';
import AddComponentPage from '../add-component/page';

jest.mock('../components/Timeline', () => ({ __esModule: true, default: () => null }));
jest.mock('../components/AddComponentForm', () => ({ __esModule: true, default: () => null }));

const UUID = '0190a5d0-0000-7000-8000-000000000001';

// Collect the `projectId` prop of the first element carrying one.
const findProjectId = (node: React.ReactNode): unknown => {
  if (!React.isValidElement(node)) return undefined;
  const props = node.props as { projectId?: unknown; children?: React.ReactNode };
  if ('projectId' in props) return props.projectId;
  for (const child of React.Children.toArray(props.children)) {
    const found = findProjectId(child);
    if (found !== undefined) return found;
  }
  return undefined;
};

// The generated PageProps type is only available after `next build`: cast to stay independent.
const call = <P,>(page: (p: P) => Promise<React.ReactNode>, query: Record<string, unknown>) =>
  page({ searchParams: Promise.resolve(query) } as unknown as P);

describe('projectId read from the URL', () => {
  it.each([
    ['timeline', TimelinePage],
    ['add-component', AddComponentPage],
  ] as const)('%s page forwards the UUID untouched', async (_name, page) => {
    const tree = await call(page as never, { projectId: UUID });
    expect(findProjectId(tree)).toBe(UUID);
  });

  it.each([
    ['timeline', TimelinePage],
    ['add-component', AddComponentPage],
  ] as const)('%s page passes undefined when there is no projectId', async (_name, page) => {
    const tree = await call(page as never, {});
    expect(findProjectId(tree)).toBeUndefined();
  });
});
