import ProductCard from "./ProductCard";

type LayoutProps = {
  children: React.ReactNode;
  handleDeleteSavedProduct?: (product: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }) => void;
  isShowSaved: boolean;
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
  isShowSaved,
  products,
  handleAddSavedProduct,
  handleDeleteSavedProduct,
}: LayoutProps) {
  return (
    <div>
      {products?.map((product, prodictIndex) => {
        return (
          <ProductCard key={prodictIndex} product={product}>
            <button
              onClick={() => {
                // Delete logic
                if (handleDeleteSavedProduct) {
                  handleDeleteSavedProduct(product);
                } else {
                  console.log("handleDeleteSavedProduct is undefined");
                }
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                // Save logic
                if (handleAddSavedProduct) {
                  handleAddSavedProduct(product);
                } else {
                  console.log("handleAddSavedProduct is undefined");
                }
              }}
            >
              Save
            </button>
          </ProductCard>
        );
      })}
    </div>
  );
}
