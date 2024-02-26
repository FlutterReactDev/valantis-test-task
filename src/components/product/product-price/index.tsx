import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import { useProductPrice } from "@components/valantis-query";
import {
  ExclamationTriangleIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { FC, useState } from "react";
interface ProductPriceProps {
  value: number | null | undefined;
  onChange: (value: number) => void;
}
export const ProductPrice: FC<ProductPriceProps> = (props) => {
  const { onChange, value } = props;
  const [open, setOpen] = useState(false);
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
    <>
      <div className="lg:flex flex-col gap-4 hidden">
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
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>
            <HamburgerMenuIcon className="h-5 w-5 mr-2" /> Цена
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
          <DrawerHeader className="text-left">
            <DrawerTitle>Цена</DrawerTitle>
            <DrawerDescription>Выберите цену</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col overflow-auto p-4 rounded-t-[10px]">
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
                      onClick={() => {
                        onChange(price);
                        setOpen(false);
                      }}
                    >
                      {RUB.format(price)}
                    </Badge>
                  );
                })}
            </div>
          </div>

          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Закрыть</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
