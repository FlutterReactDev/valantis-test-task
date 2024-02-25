import {
  GetProductFilterParams,
  GetProductIdsParams,
  GetProductItemParams,
} from "@utils/valantis/types";
import { useValantis } from "@components/valantis-query";
import { useQuery } from "@tanstack/react-query";

const PRODUCTS_IDS_QUERY_KEY = `productsIds` as const;
const PRODUCTS_ITEMS_QUERY_KEY = `productsItems` as const;
const PRODUCTS_BRANDS_QUERY_KEY = `productsBrands` as const;
const PRODUCTS_PRICE_QUERY_KEY = `productsPrice` as const;
const PRODUCTS_FILTER_QUERY_KEY = `productsFilter` as const;
export const useProductsIds = (query?: GetProductIdsParams) => {
  const { client } = useValantis();
  const { data, ...rest } = useQuery({
    queryKey: [PRODUCTS_IDS_QUERY_KEY, "lists"],
    queryFn: () => client.product.listIds(query),
    staleTime: 0,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore

  return { products: data, ...rest } as const;
};

export const useProductsItem = (query?: GetProductItemParams) => {
  const { client } = useValantis();
  const { data, ...rest } = useQuery({
    queryKey: [PRODUCTS_ITEMS_QUERY_KEY],
    queryFn: () => client.product.listItems(query),
  });
  return { products: data, ...rest } as const;
};

export const useProductBrands = () => {
  const { client } = useValantis();
  const { data, ...rest } = useQuery({
    queryKey: [PRODUCTS_BRANDS_QUERY_KEY],
    queryFn: () =>
      client.product.listByFields({
        field: "brand",
      }),
  });
  return { brands: data, ...rest } as const;
};
export const useProductPrice = () => {
  const { client } = useValantis();
  const { data, ...rest } = useQuery({
    queryKey: [PRODUCTS_PRICE_QUERY_KEY],
    queryFn: () =>
      client.product.listByFields({
        field: "price",
      }),
  });
  return { price: data, ...rest } as const;
};

export const useProductItemFilter = (query?: GetProductFilterParams) => {
  const { client } = useValantis();
  const { data, ...rest } = useQuery({
    queryKey: [PRODUCTS_FILTER_QUERY_KEY],
    queryFn: () => client.product.listFilter(query),
    staleTime: 0,
  });
  return { data: data, ...rest } as const;
};
