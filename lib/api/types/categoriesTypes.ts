export interface Region {
  _id: string;
  region: string;
  slug: string;
  level: string;
  note: string;
}

export interface GetRegionsResponse {
  status: number;
  message: string;
  data: Region[];
}

export interface LocationType {
  _id: string;
  type: string;
  slug: string;
  shortDescription: string;
}

export interface GetCategoriesTypesResponse {
  status: number;
  message: string;
  data: LocationType[];
}
