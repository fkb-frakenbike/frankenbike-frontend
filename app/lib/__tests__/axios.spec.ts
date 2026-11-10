import type { InternalAxiosRequestConfig } from 'axios';
import api from '../axios';

const send = async (method: string) => {
  let seen: InternalAxiosRequestConfig | undefined;
  await api.request({
    url: '/api/x',
    method,
    adapter: async (config) => {
      seen = config;
      return { data: {}, status: 200, statusText: 'OK', headers: {}, config };
    },
  });
  return seen!.headers.get('X-Requested-With');
};

describe('api client CSRF header', () => {
  it.each(['post', 'put', 'patch', 'delete'])('adds X-Requested-With on %s', async (method) => {
    expect(await send(method)).toBe('fkb');
  });

  it('does not add it on get', async () => {
    expect(await send('get')).toBeFalsy();
  });

  it('sends cookies', () => {
    expect(api.defaults.withCredentials).toBe(true);
  });
});
