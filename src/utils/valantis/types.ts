export interface GetProductIdsParams {
  offset?: number;
  limit?: number;
}

export interface GetProductItemParams {
  ids?: string[];
  offset?: number;
  limit?: number;
}

export interface GetProductFiledsParams {
  field?: string;
  offset?: number;
  limit?: number;
}
export interface GetProductFilterParams {
  brand?: string;
  price?: number;
  product?: string;
}
export enum QueryActions {
  GET_ITEMS = "get_items",
  GET_IDS = "get_ids",
  GET_FIELDS = "get_fields",
  FILTER = "filter",
}

export interface Product {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}
