import axios, { AxiosError } from 'axios';
import mockError from '../../../mocks/error.mock';
import mockProductResponse from '../../../mocks/product-uuid.mock';

import { get, getAll, getOne } from './product-uuid';

const axiosGetSpy = jest.spyOn(axios, 'get');

const mockFunction = (data: Record<string, any>) => async () =>
  Promise.resolve({ data });

afterEach(() => {
  jest.clearAllMocks();
});

describe('Product UUID', () => {
  test('get products', async () => {
    axiosGetSpy.mockImplementation(mockFunction(mockProductResponse.get));

    const { items } = await get(axios, {});
    expect(axios.get).toHaveBeenCalledWith('/api/rest/v1/products-uuid', {});
    expect(items).toHaveLength(1);
  });

  test('getOne', async () => {
    axiosGetSpy.mockImplementation(mockFunction(mockProductResponse.getOne));

    const category = await getOne(axios, { uuid: 'test' });
    expect(axios.get).toHaveBeenCalledWith(
      '/api/rest/v1/products-uuid/test',
      {},
    );
    expect(category).toHaveProperty('family');
  });

  test('Get with valid parameters', async () => {
    axiosGetSpy.mockImplementation(mockFunction(mockProductResponse.get));

    await get(axios, {
      query: {
        search: '{"main_color":[{"operator":"IN","value":["purple"]}]}',
      },
    });

    expect(axios.get).toHaveBeenCalledWith('/api/rest/v1/products-uuid', {
      params: {
        search: '{"main_color":[{"operator":"IN","value":["purple"]}]}',
      },
    });
  });

  test('Get products with invalid parameters', async () => {
    axiosGetSpy.mockImplementation(async () => {
      throw new AxiosError(...mockError.badRequest);
    });

    await expect(() =>
      get(axios, { query: { search: 'test' } }),
    ).rejects.toThrow(
      new Error(JSON.stringify(mockError.response, null, '  ')),
    );
  });

  test('getAll', async () => {
    axiosGetSpy.mockImplementation(async () =>
      Promise.resolve({ data: mockProductResponse.getAll }),
    );

    const { items: products } = await getAll(axios, {});
    expect(axios.get).toHaveBeenCalledWith('/api/rest/v1/products-uuid', {
      params: {
        limit: 100,
        pagination_type: 'search_after',
      },
    });
    expect(products).toHaveLength(1);
  });

  test('getAll with pagination_type="page"', async () => {
    axiosGetSpy.mockImplementation(async () =>
      Promise.resolve({ data: mockProductResponse.getAll }),
    );

    const { items: products } = await getAll(axios, {
      query: { pagination_type: 'page' },
    });
    expect(axios.get).toHaveBeenCalledWith('/api/rest/v1/products-uuid', {
      params: {
        limit: 100,
        page: 1,
        pagination_type: 'page',
        with_count: true,
      },
    });
    expect(products).toHaveLength(1);
  });
});
