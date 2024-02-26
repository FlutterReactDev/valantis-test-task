import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Badge } from "@components/ui/badge";
import { useProductPrice } from "@components/valantis-query";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { FC } from "react";
interface ProductPriceProps {
  value: number | null | undefined;
  onChange: (value: number) => void;
}
export const ProductPrice: FC<ProductPriceProps> = (props) => {
  const { onChange, value } = props;
  const { price, isLoading, error, isError } = useProductPrice();

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
  if (!price?.length) {
    return <div>Нет товара</div>;
  }

  const RUB = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  });

  const prices = [
    ...new Set(...[price.filter(Boolean)]),
  ] as unknown as number[];
  return (
    <div className="flex flex-col gap-4 ">
      <h2 className="mt-10  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Цены
      </h2>
      <div className="flex gap-2 flex-wrap">
        {prices
          .sort((a: number, b: number) => a - b)
          .map((price, idx) => {
            const isSelected = value == price;
            return (
              <Badge
                className="cursor-pointer "
                variant={isSelected ? "default" : "outline"}
                key={`${price}-${idx}`}
                onClick={() => onChange(price)}
              >
                {RUB.format(price)}
              </Badge>
            );
          })}
      </div>
    </div>
  );
};
