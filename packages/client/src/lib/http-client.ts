import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { ClientParams } from './types';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    retry: boolean;
  }
}

const TOKEN_PATH = '/api/oauth/v1/token';

const defaultConfig: Partial<AxiosRequestConfig> = {
  timeout: 30000,
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
  });
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

  // requests that failed due to invalid access token will be retried once with a refreshed access token.
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      if (!originalRequest || originalRequest.retry)
        return Promise.reject(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        originalRequest.headers.Authorization = `Bearer ${await refreshAccessToken()}`;
        originalRequest.retry = true;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createHttpClient;
