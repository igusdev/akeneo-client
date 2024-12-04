import { AxiosInstance } from 'axios';
import { ListResponse, ProductQueryParameters, ProductUuid } from '../types';
import raw from './raw';

/**
 * @see https://api.akeneo.com/api-reference.html#get_products
 */
export const get = (
  http: AxiosInstance,
  { query }: { query?: ProductQueryParameters },
): Promise<ListResponse<ProductUuid>> =>
  raw.get(http, `/api/rest/v1/products-uuid`, {
    params: query,
  });

/**
 * @see https://api.akeneo.com/api-reference.html#get_products__code_
 */
export const getOne = (
  http: AxiosInstance,
  {
    uuid,
    query,
  }: {
    uuid: string;
    query?: {
      with_attribute_options?: boolean;
      with_quality_scores?: boolean;
    };
  },
): Promise<ProductUuid> =>
  raw.getOne(http, `/api/rest/v1/products-uuid/${uuid}`, {
    params: query,
  });

export const getAll = (
  http: AxiosInstance,
  { query = {} }: { query?: ProductQueryParameters },
): Promise<ListResponse<ProductUuid>> => {
  // support legacy pagination_type "page"
  if (query?.pagination_type === 'page') {
    return raw.getAllByPage(http, `/api/rest/v1/products-uuid`, {
      params: query,
    });
  }

  return raw.getAllBySearchAfter(http, `/api/rest/v1/products-uuid`, {
    params: query,
  });
};
