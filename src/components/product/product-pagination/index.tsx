import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
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
  isFilterChanged: boolean;
  count?: number;
}
export const ProductPagintaion: FC<ProductPagintaionProps> = (props) => {
  const {
    onJump,
    value,
    onNext,
    onPrev,
    limit,
    isFilterChanged,
    count,
    offset,
  } = props;
  const { products, isLoading } = useProductsIds();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!products?.length) {
    return <div>Нет товара</div>;
  }

  const pageNumbers = [
    ...(isFilterChanged
      ? [...Array(count || 0 + 1).keys()]
      : [...Array(Math.ceil(products.length / limit + 1)).keys()]),
  ].slice(1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={onPrev}
            className={cn(
              "cursor-pointer",
              offset <= 0 && "pointer-events-none"
            )}
            
            isActive
            {...(offset <= 0 && {
              isActive: false,
            })}
          />
        </PaginationItem>
        <ScrollArea className="max-w-60 w-full overflow-hidden whitespace-nowrap rounded-md">
          {pageNumbers.map((page, idx) => {
            return (
              <PaginationLink
                {...(value == idx && {
                  isActive: true,
                })}
                key={page}
                className="cursor-pointer"
                onClick={() => onJump(page-1)}
                
              >
                {page}
              </PaginationLink>
            );
          })}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <PaginationItem>
          <PaginationNext
            onClick={onNext}
            className={cn(
              "cursor-pointer",
              offset >= pageNumbers.length * limit && "pointer-events-none"
            )}
            isActive
            {...(offset >= pageNumbers.length * limit && {
              isActive: false,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
