import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";
import { useProductsIds } from "@components/valantis-query";
import { FC } from "react";
interface ProductPagintaionProps {
  value: number;
  onNext: () => void;
  onPrev: () => void;
  onJump: (value: number) => void;
  limit: number;
  offset: number;
}
export const ProductPagintaion: FC<ProductPagintaionProps> = (props) => {
  const { onJump, value, onNext, onPrev, limit } = props;
  const { products, isLoading } = useProductsIds();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!products?.length) {
    return <div>Нет товара</div>;
  }

  const pageNumbers = [
    ...Array(Math.ceil(products.length / limit + 1)).keys(),
  ].slice(1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={onPrev} className="cursor-pointer" />
        </PaginationItem>
        <ScrollArea className="max-w-60 w-full overflow-hidden whitespace-nowrap rounded-md">
          {pageNumbers.map((page) => {
            return (
              <PaginationLink
                {...(value == page && {
                  isActive: true,
                })}
                key={page}
                className="cursor-pointer"
                onClick={() => onJump(page)}
              >
                {page}
              </PaginationLink>
            );
          })}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <PaginationItem>
          <PaginationNext onClick={onNext} className="cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
