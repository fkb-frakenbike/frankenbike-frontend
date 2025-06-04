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

  it('redirects to /feed if /api/me returns 200', async () => {
    // Mock fetch to return status 200
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<LoginCheck />);

    // Wait for push to be called
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(push).toHaveBeenCalledWith('/feed');
  });

  it('does not redirect if /api/me returns an error', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<LoginCheck />);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(push).not.toHaveBeenCalled();
  });
});
