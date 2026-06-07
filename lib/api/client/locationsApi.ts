import { forwardBackend } from '../api';
import { LocationQuery, LocationsResponse } from '../types/locationTypes';

export async function getAllLocations(
  query: LocationQuery,
): Promise<LocationsResponse> {
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== undefined && value !== null && value !== '', // Перевіряю щоб не записувало пусті параметри
    ),
  );

  const res = await forwardBackend.get<LocationsResponse>('/locations', {
    params: cleanedQuery,
  });
  return res.data;
}
