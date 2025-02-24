import ProductCard from "./ProductCard";

type LayoutProps = {
  children: React.ReactNode;
  products?: [
    {
      id: number;
      title: string;
      price: string;
      category: string;
      description: string;
      image: string;
    }
  ];
  handleAddSavedProduct?: (product: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }) => void;
};
export default function ProductList({
  products,
  handleAddSavedProduct,
}: LayoutProps) {
  return (
    <div>
      {products?.map((product, prodictIndex) => {
        return (
          <ProductCard
            handleAddSavedProduct={handleAddSavedProduct}
            key={prodictIndex}
            product={product}
          />
        );
      })}
    </div>
  );
}
