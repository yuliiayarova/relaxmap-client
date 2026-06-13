import { forwardBackend, nextServer } from '../api';
import {
  CreateLocation,
  Location,
  LocationQuery,
  LocationsResponse,
  UpdateLocation,
} from '../types/locationTypes';

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

export async function createLocation(
  location: CreateLocation,
): Promise<Location> {
  const res = await nextServer.post<Location>('/locations', location);
  return res.data;
}

export async function getLocationById(locationId: string): Promise<Location> {
  const res = await forwardBackend.get<Location>(`/locations/${locationId}`);
  return res.data;
}

export async function updateLocation(
  locationId: string,
  body: UpdateLocation,
): Promise<Location> {
  const cleanedBody = Object.fromEntries(
    Object.entries(body).filter(
      ([, value]) => value !== undefined && value !== null && value !== '', // Тут якщо ми допускаємо пустий description цю перевірку треба забрати
    ),
  );

  const res = await nextServer.patch<Location>(
    `/locations/${locationId}`,
    cleanedBody,
  );
  return res.data;
}
