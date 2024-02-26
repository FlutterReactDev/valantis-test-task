import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Input } from "@components/ui/input";
import {
  useProductItemFilter,
  useProductsIds,
} from "@components/valantis-query";
import { ExclamationTriangleIcon, TrashIcon } from "@radix-ui/react-icons";
import { stringify } from "qs";
import { useEffect } from "react";
import { ProductBrands, ProductItems, ProductPagintaion } from "..";
import { ProductPrice } from "../product-price";
import { useProductFilter } from "../use-product-filter";
import { Button } from "@components/ui/button";

export const ProductList = () => {
  const {
    state,
    jump,
    paginate,
    setBrand,
    setQuery,
    representationObject,
    setPrice,
    isFilterChanged,
    reset,
  } = useProductFilter(location.search);

  const updateUrlFromFilter = (qs: string) => {
    window.history.replaceState("/", "", `${`?${qs}`}`);
  };

  useEffect(() => {
    updateUrlFromFilter(stringify(representationObject));
  }, [representationObject]);

  const { products, isLoading, isError, error } = useProductsIds({
    limit: state.limit,
    offset: state.offset,
  });

  const { data, isLoading: isFilteredIdsLoading } = useProductItemFilter({
    brand: state.brand || "",
    price: state.price || 0,
    product: state.query || "",
  });

  const dataLoading = isFilteredIdsLoading || isLoading;

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>{error.name}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!products?.length && !dataLoading) {
    return <div>Нет товара</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Поиск"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={state.query || ""}
      />
      <ProductBrands setBrands={setBrand} activeBrand={state.brand} />
      <ProductPrice value={state.price} onChange={setPrice} />
      <div>
        <Button onClick={reset}>
          <TrashIcon className="w-5 h-5" /> Сбросить фильтры
        </Button>
      </div>

      <ProductItems
        isGetIdsLoading={dataLoading}
        ids={isFilterChanged ? [...new Set(data)] : [...new Set(products)]}
        isFilterChanged={isFilterChanged}
        offset={state.offset}
        limit={state.limit}
      />

      <ProductPagintaion
        limit={state.limit}
        onJump={(page: number) => {
          jump(page);
        }}
        onNext={() => paginate(1)}
        onPrev={() => paginate(-1)}
        value={state.offset / state.limit}
        offset={state.offset}
        isFilterChanged={isFilterChanged}
        count={data?.length ? Math.ceil(data.length / state.limit) : 0}
      />
    </div>
  );
};
