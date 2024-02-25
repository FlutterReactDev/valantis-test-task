import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Input } from "@components/ui/input";
import { useProductsIds } from "@components/valantis-query";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { stringify } from "qs";
import { useEffect } from "react";
import { ProductBrands, ProductItems, ProductPagintaion } from "..";
import { ProductPrice } from "../product-price";
import { useProductFilter } from "../use-product-filter";

export const ProductList = () => {
  const {
    state,
    jump,
    paginate,
    setBrand,
    setQuery,
    representationObject,
    setPrice,
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>{error.name}</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }
  if (!products?.length) {
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
      />
      <ProductBrands setBrands={setBrand} activeBrand={state.brand} />
      <ProductPrice value={state.price} onChange={setPrice} />
      <ProductItems ids={[...new Set(products)]} />
      <ProductPagintaion
        limit={state.limit}
        onJump={(page: number) => {
          jump(page);
        }}
        onNext={() => paginate(1)}
        onPrev={() => paginate(-1)}
        value={state.offset / state.limit}
        offset={state.offset}
      />
    </div>
  );
};
