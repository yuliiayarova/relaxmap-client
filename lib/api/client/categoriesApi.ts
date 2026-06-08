import { forwardBackend } from '../api';
import { GetCategoriesTypesResponse, GetRegionsResponse } from '../types/categoriesTypes';

export async function getRegionsCategories(): Promise<GetRegionsResponse> {
  const res = await forwardBackend.get<GetRegionsResponse>(
    '/categories/regions',
  );
  return res.data;
}

export async function getCategoriesTypes(): Promise<GetCategoriesTypesResponse> {
  const res = await forwardBackend.get<GetCategoriesTypesResponse>(
    '/categories/location-types',
  );
  return res.data;
}
