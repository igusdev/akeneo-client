import axios from 'axios';

import { AxiosError } from 'axios';
import mockError from '../../../mocks/error.mock';
import mockCategoryResponse from '../../../mocks/category.mock';

import { getOne, get, getAll } from './category';

const axiosGetSpy = jest.spyOn(axios, 'get');

afterEach(() => {
  jest.clearAllMocks();
});

describe('Category', () => {
  test('get', async () => {
    axiosGetSpy.mockImplementation(async () =>
      Promise.resolve({ data: mockCategoryResponse.get }),
    );

    const { items } = await get(axios, {});
    expect(axios.get).toHaveBeenCalledWith('/api/rest/v1/categories', {
      params: {},
    });
    expect(items).toHaveLength(1);
  });

  test('getOne', async () => {
    axiosGetSpy.mockImplementation(async () =>
      Promise.resolve({ data: mockCategoryResponse.getOne }),
    );

    const category = await getOne(axios, { code: 'test' });
    expect(axios.get).toHaveBeenCalledWith('/api/rest/v1/categories/test', {
      params: {},
    });
    expect(category).toHaveProperty('labels');
  });

  test('Get with valid parameters', async () => {
    axiosGetSpy.mockImplementation(async () =>
      Promise.resolve({ data: mockCategoryResponse.get }),
    );

    await get(axios, {
      query: {
        search: '{"code":[{"operator":"IN","value":["code1","code2"]}]}',
      },
    });

    expect(axios.get).toHaveBeenCalledWith('/api/rest/v1/categories', {
      params: {
        search: '{"code":[{"operator":"IN","value":["code1","code2"]}]}',
      },
    });
  });

  test('Get with invalid parameters', async () => {
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
      Promise.resolve({ data: mockCategoryResponse.getAll }),
    );

    const { items: categories } = await getAll(axios, {
      query: {
        search: JSON.stringify({
          parent: [{ operator: '=', value: 'some category' }],
        }),
      },
    });
    expect(axios.get).toHaveBeenCalledWith('/api/rest/v1/categories', {
      params: {
        search: '{"parent":[{"operator":"=","value":"some category"}]}',
        limit: 100,
        page: 1,
        with_count: true,
      },
    });
    expect(categories).toHaveLength(1);
  });
});
