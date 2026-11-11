import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Timeline from '../index';
import api from '@/app/lib/axios';

const setContextProjectId = jest.fn();

jest.mock('@/app/lib/axios', () => ({ __esModule: true, default: { get: jest.fn(), post: jest.fn() } }));
jest.mock('@/app/context/AuthContext', () => ({
  useAuth: () => ({ auth: null, loading: false }),
}));
jest.mock('@/app/context/ProjectContext', () => ({
  useProject: () => ({ selectedProjectId: null, setSelectedProjectId: setContextProjectId }),
}));
jest.mock('../../Carousel', () => ({ __esModule: true, default: () => null }));
jest.mock('../../TextLoader/TextLoader', () => ({ __esModule: true, default: () => null }));
jest.mock('../../TextLoader/TextLoader.css', () => ({}));
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: { alt: string }) => <img alt={props.alt} />,
}));
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

const USER_ID = '0190a5d0-0000-7000-8000-00000000000a';
const P1 = '0190a5d0-0000-7000-8000-000000000001';
const P2 = '0190a5d0-0000-7000-8000-000000000002';

const project = (id: string, title: string) => ({
  id,
  title,
  components: [],
  user: { id: USER_ID, email: 'a@b.c', profile: { firstName: 'Ana', photoUrl: null } },
});

const get = api.get as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Timeline with UUID v7 ids', () => {
  it('loads the project from the URL id, then its owner projects', async () => {
    get.mockImplementation((url: string) => {
      if (url === `/api/projects/${P2}`) return Promise.resolve({ data: project(P2, 'Two') });
      if (url === `/api/users/${USER_ID}/projects`) {
        return Promise.resolve({ data: { data: [project(P1, 'One'), project(P2, 'Two')] } });
      }
      return Promise.reject(new Error(`unexpected GET ${url}`));
    });

    render(<Timeline projectId={P2} />);

    const select = (await screen.findByRole('combobox')) as HTMLSelectElement;
    expect(get).toHaveBeenCalledWith(`/api/projects/${P2}`);
    await waitFor(() => expect(select.value).toBe(P2));
    expect(setContextProjectId).toHaveBeenLastCalledWith(P2);
  });

  it('keeps the chosen UUID as a string when the user changes project', async () => {
    get.mockResolvedValue({ data: { projects: [project(P1, 'One'), project(P2, 'Two')] } });

    render(<Timeline />);

    const select = (await screen.findByRole('combobox')) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: P2 } });

    expect(setContextProjectId).toHaveBeenLastCalledWith(P2);
    await waitFor(() => expect(select.value).toBe(P2));
  });
});
