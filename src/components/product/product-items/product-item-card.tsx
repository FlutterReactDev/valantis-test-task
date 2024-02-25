import { Product } from "@utils/valantis/types";
import { FC } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Badge } from "@components/ui/badge";
export const ProductItemCard: FC<Product> = (props) => {
  const { brand, id, price, product } = props;
  const RUB = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product}</CardTitle>
        <CardDescription>{id}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge>{brand}</Badge>
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {RUB.format(price)}
        </h2>
      </CardContent>
    </Card>
  );
};
