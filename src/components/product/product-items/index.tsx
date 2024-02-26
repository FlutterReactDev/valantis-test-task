import { useProductsItem } from "@components/valantis-query";
import { FC, PropsWithChildren } from "react";
import { ProductItemSkeleton } from "./skeleton";
import { ProductItemCard } from "./product-item-card";
import { Alert, AlertTitle, AlertDescription } from "@components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { paginate } from "@utils/paginate";
import { Product } from "@utils/valantis/types";

interface ProductItemsProps {
  ids: string[];
  isGetIdsLoading: boolean;
  isFilterChanged: boolean;
  offset: number;
  limit: number;
}

const Wrapper: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 w-full">
      {children}
    </div>
  );
};

const renderItems = (
  isFilterChanged: boolean,
  arr: Product[],
  limit: number,
  offset: number
) => {
  if (isFilterChanged) {
    return paginate(limit, offset, arr);
  }
  return arr;
};

export const ProductItems: FC<ProductItemsProps> = (props) => {
  const { ids, isGetIdsLoading, isFilterChanged, limit, offset } = props;
  const { products, isLoading, isError, error } = useProductsItem({
    ids,
  });

  if (isLoading || isGetIdsLoading) {
    return (
      <Wrapper>
        {Array(10)
          .fill("")
          .map((_, idx) => {
            return <ProductItemSkeleton key={idx} />;
          })}
      </Wrapper>
    );
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
    <Wrapper>
      {renderItems(
        isFilterChanged,
        products.filter((product, idx, self) => {
          return (
            idx ==
            self.findIndex((val) => {
              return val.id == product.id;
            })
          );
        }),
        limit,
        offset
      ).map((prop) => {
        return <ProductItemCard key={prop.id} {...prop} />;
      })}
    </Wrapper>
  );
};
