import {
  GetProductItemParams,
  GetProductIdsParams,
  QueryActions,
  GetProductFiledsParams,
  Product,
  GetProductFilterParams,
} from "../types";
import BaseResource from "./base";

class ProductResource extends BaseResource {
  async listFilter(query?: GetProductFilterParams): Promise<string[]> {
    const { result } = await this.client.request("POST", "", {
      action: QueryActions.FILTER,
      params: {
        ...(query?.brand && {
          brand: query?.brand,
        }),
        ...(query?.price && {
          price: query?.price,
        }),
        ...(query?.product && {
          product: query?.product,
        }),
      },
    });

    return result;
  }
  async listIds(query?: GetProductIdsParams): Promise<string[]> {
    const { result } = await this.client.request("POST", "", {
      action: QueryActions.GET_IDS,
      params: query,
    });

    return result;
  }

  async listItems(query?: GetProductItemParams): Promise<Product[]> {
    const { result } = await this.client.request("POST", "", {
      action: QueryActions.GET_ITEMS,
      params: query,
    });

    return result;
  }

  async listByFields(
    query?: GetProductFiledsParams
  ): Promise<(string | null)[]> {
    const { result } = await this.client.request("POST", "", {
      action: QueryActions.GET_FIELDS,
      params: query,
    });
    return result;
  }
}

export default ProductResource;
