import type { InternalAxiosRequestConfig } from 'axios';

export default {
  badRequest: [
    'Request failed with status code 400',
    '400',
    undefined,
    { params: { search: 'test' } },
    {
      status: 400,
      statusText: 'Bad request',
      data: {
        code: 400,
        message: 'Search query parameter should be valid JSON.',
      },
      headers: {},
      config: {} as InternalAxiosRequestConfig,
    },
  ] as const,
  response: {
    status: 400,
    statusText: 'Bad request',
    message: 'Search query parameter should be valid JSON.',
    details: {},
    request: {},
  },
};
