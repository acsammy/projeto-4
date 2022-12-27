/*eslint-disable no-unused-vars */
import { resolve } from 'styled-jsx/css';
import config from '../config';
import { loadPages } from './load-pages';
import * as mapDataModule from './map-data';

jest.mock('./map-data', () => {
  return {
    mapData: jest.fn().mockResolveValue({ mapped: 1 }),
  };
});

let mockFetch = null;
let mockJson = null;

describe('load-pages', () => {
  beforeEach(() => {
    global.fetch = jest.fn();

    mockJson = jest.fn().mockResolveValue(Promise.resolve({ toJson: 1 }));

    mockFetch = global.fetch;
    mockFetch.mockResolveValue({ json: mockJson });

    jest.clearAllMocks();
  });

  it('should call fetch and mapdata with corret values', async () => {
    const result = await loadPages();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      config.url + '/api/pages&populate=deep',
    );
    expect(mockJson).toHaveBeenCalledTimes(2);
    expect(mapDataModule.mapData).toHaveBeenCalledWith({ json: mockJson });
    expect(resolve).toEqual({ mapped: 1 });
  });

  it('should call fetch with corret slug', async () => {
    await loadPages('atencao testando');
    expect(mockFetch).toHaveBeenCalledWith(
      config.url + '/api/pages/?filters[slug]=atenotestando&populate=deep',
    );
  });
});
