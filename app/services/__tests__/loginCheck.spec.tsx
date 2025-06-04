import React from 'react';
import { render } from '@testing-library/react';
import LoginCheck from '../loginCheck';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginCheck', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch global
    global.fetch = jest.fn();
  });

  it('redirige vers /feed si /api/me retourne 200', async () => {
    // Mock fetch pour retourner un status 200
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<LoginCheck />);

    // Attends que le push soit appelé
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(push).toHaveBeenCalledWith('/feed');
  });

  it('ne redirige pas si /api/me retourne une erreur', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<LoginCheck />);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(push).not.toHaveBeenCalled();
  });
});
