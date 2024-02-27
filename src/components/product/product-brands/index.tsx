import { useProductBrands } from "@components/valantis-query";
import { ProductBrandSkeleton } from "./skeleton";
import { Badge } from "@components/ui/badge";
import { FC } from "react";
interface ProductBrandsProps {
  activeBrand: string | null | undefined;
  setBrands: (brands: string | null) => void;
}
export const ProductBrands: FC<ProductBrandsProps> = (props) => {
  const { activeBrand, setBrands } = props;
  const { brands, isLoading } = useProductBrands();

  const onChange = (brandName: string) => {
    if (activeBrand == brandName) {
      return setBrands(null);
    }
    setBrands(brandName);
  };

  if (isLoading) {
    return (
      <div className="flex gap-2 flex-wrap">
        {Array(10)
          .fill("")
          .map((_, idx) => {
            return <ProductBrandSkeleton key={idx} />;
          })}
      </div>
    );
  }
  if (!brands?.length) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Бренды
      </h2>
      <div className="flex gap-2 flex-wrap">
        {[...new Set(...[brands.filter(Boolean)])].map((name, idx) => {
          const brandName = name as string;
          const isSelected = activeBrand == brandName;
          return (
            <Badge
              className="cursor-pointer "
              variant={isSelected ? "default" : "outline"}
              key={`${brandName}-${idx}`}
              onClick={() => onChange(brandName)}
            >
              {brandName}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
