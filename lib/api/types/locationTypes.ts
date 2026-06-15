export interface LocationQuery {
  page?: number;
  perPage?: number;
  region?: string;
  locationType?: string;
  search?: string;
  sortBy?: string; // Тут потрібно буде строго типізувати
  sortOrder?: SortOrder;
}

export type SortOrder = 'asc' | 'desc'; // Це можна буде винести в окремий загальний файл типів

export interface Location {
  coordinates: {
    lat: number;
    lng?: number;
    lon?: number;
  };
  _id: string;
  image: string;
  name: string;
  locationType: string; // Строга типізація (напевно)
  region: string;
  rate: number;
  description: string;
  ownerId: string;
  feedbacksId: string[];
  updatedAt: string;
}

export interface CreateLocation {
  name: string;
  image: string;
  locationType: string;
  region: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface UpdateLocation {
  name?: string;
  image?: string;
  locationType?: string;
  region?: string;
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface LocationsResponse {
  page: number;
  perPage: number;
  totalLocations: number;
  totalPages: number;
  locations: Location[];
}
