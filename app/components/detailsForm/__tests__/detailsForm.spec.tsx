import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentDetailsWrapper from '../index';
import api from '@/app/lib/axios';

jest.mock('@/app/lib/axios', () => ({ __esModule: true, default: { get: jest.fn() } }));
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: { alt: string }) => <img alt={props.alt} />,
}));

const UUID = '0190a5d0-0000-7000-8000-000000000001';
const get = api.get as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  get.mockResolvedValue({
    data: { name: 'Fork', description: 'Nice fork', photoS3Key: 'http://localhost:8787/uploads/x.png' },
  });
});

describe('ComponentDetailsWrapper with UUID v7 ids', () => {
  it('fetches and shows the component for a UUID v7 id', async () => {
    render(<ComponentDetailsWrapper id={UUID} />);

    expect(await screen.findByRole('heading', { name: 'Fork' })).toBeInTheDocument();
    expect(get).toHaveBeenCalledWith(`/api/components/${UUID}`);
  });

  it.each(['123', 'abc', '../me', '0190a5d0-0000-4000-8000-000000000001'])(
    'rejects %p without calling the API',
    async id => {
      render(<ComponentDetailsWrapper id={id} />);

      expect(await screen.findByText('ID de composant invalide')).toBeInTheDocument();
      expect(get).not.toHaveBeenCalled();
    }
  );
});
