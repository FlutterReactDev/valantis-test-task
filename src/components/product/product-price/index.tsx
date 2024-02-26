import { Alert, AlertTitle, AlertDescription } from "@components/ui/alert";
import { Slider } from "@components/ui/slider";
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

  const p = price as unknown as number[];

  const [min, max] = [Math.min(...p), Math.max(...p)];
  const RUB = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        от {RUB.format(min)} до {RUB.format(value || max)}
      </h2>
      <Slider
        min={min}
        max={max}
        onValueCommit={(val) => {
          onChange(val[0]);
        }}
        step={10}
        {...(value && {
          defaultValue: [value],
        })}
      />
    </div>
  );
};
