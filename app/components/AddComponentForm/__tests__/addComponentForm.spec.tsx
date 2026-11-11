import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AddComponentForm from '../index';
import api from '@/app/lib/axios';

const setContextProjectId = jest.fn();
const push = jest.fn();

jest.mock('@/app/lib/axios', () => ({ __esModule: true, default: { get: jest.fn(), post: jest.fn() } }));
jest.mock('@/app/context/ProjectContext', () => ({
  useProject: () => ({ selectedProjectId: null, setSelectedProjectId: setContextProjectId }),
}));
jest.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: { alt: string }) => <img alt={props.alt} />,
}));

const P1 = '0190a5d0-0000-7000-8000-000000000001';
const P2 = '0190a5d0-0000-7000-8000-000000000002';

const get = api.get as jest.Mock;
const post = api.post as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  global.URL.createObjectURL = jest.fn(() => 'blob:preview');
  get.mockResolvedValue({
    data: { projects: [{ id: P1, title: 'One' }, { id: P2, title: 'Two' }] },
  });
  post.mockResolvedValue({ data: { id: 'c1' } });
});

const fillAndSubmit = async (container: HTMLElement) => {
  await screen.findByRole('option', { name: 'Two' });
  fireEvent.change(screen.getByLabelText('Projet'), { target: { value: P2 } });
  fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Fork' } });
  fireEvent.change(screen.getByLabelText('Catégorie'), { target: { value: 'frame' } });
  fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Nice' } });
  const file = new File(['x'], 'a.png', { type: 'image/png' });
  fireEvent.change(container.querySelector('#photo') as HTMLInputElement, {
    target: { files: [file] },
  });
  fireEvent.submit(container.querySelector('form') as HTMLFormElement);
  // let the submit finish (loading back to false) so no state update lands after the test
  await waitFor(() => expect(screen.getByRole('button', { name: 'Envoyer' })).toBeEnabled());
};

describe('AddComponentForm with UUID v7 ids', () => {
  it('posts to the UUID project chosen in the select', async () => {
    const { container } = render(<AddComponentForm />);
    await fillAndSubmit(container);

    expect(post).toHaveBeenCalledTimes(1);
    expect(post.mock.calls[0][0]).toBe(`/api/projects/${P2}/components`);
  });

  it('stores the UUID string in the project context after a successful post', async () => {
    const { container } = render(<AddComponentForm />);
    await fillAndSubmit(container);

    expect(push).toHaveBeenCalledWith('/timeline');
    expect(setContextProjectId).toHaveBeenLastCalledWith(P2);
  });
});
