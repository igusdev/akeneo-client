import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ClientParams } from './types';

const TOKEN_PATH = '/api/oauth/v1/token';

const defaultConfig = {
  insecure: false,
  retryOnError: true,
  headers: {} as Record<string, unknown>,
  httpAgent: false,
  httpsAgent: false,
  timeout: 30000,
  proxy: false as const,
  basePath: '',
  adapter: undefined,
  maxContentLength: 1073741824, // 1GB
};

/**
 * Create pre-configured axios instance
 * @private
 * @param {ClientParams} options - Initialization parameters for the HTTP client
 * @return {AxiosInstance} Initialized axios instance
 */
const createHttpClient = (options: ClientParams): AxiosInstance => {
  let accessToken = '';
  const { url, clientId, secret, username, password } = options;

  const baseURL = url.replace(/\/+$/, '');

  const instance = axios.create({
    ...defaultConfig,
    ...(options.axiosOptions || {}),
    baseURL,
  }) as AxiosInstance;
  const base64Encoded = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const refreshAccessToken = async () => {
    const tokenResult = await axios.post(
      `${baseURL}${TOKEN_PATH}`,
      { grant_type: 'password', username, password },
      {
        headers: {
          Authorization: `Basic ${base64Encoded}`,
        },
      }
    );

    accessToken = tokenResult.data.access_token;
    return accessToken;
  };

  instance.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${
      accessToken || (await refreshAccessToken())
    }`;
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        accessToken = '';
        originalRequest.headers.Authorization = `Bearer ${await refreshAccessToken()}`;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createHttpClient;
