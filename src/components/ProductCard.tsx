type LayoutProps = {
  product?: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  };
  handleAddSavedProduct?: (product: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  }) => void;
};

export default function ProductCard({
  product,
  handleAddSavedProduct,
}: LayoutProps) {
  return (
    <div>
      <h2>{product?.title}</h2>
      <p>{product?.category}</p>
      <p>{product?.price} $</p>
      <button
        onClick={() => {
          if (handleAddSavedProduct) {
            handleAddSavedProduct(product);
          }else {
            console.log('handleAddSavedProduct is undefined')
          }
        }}
      >
        Save
      </button>
      <img src={product?.image} />
      <p>{product?.description}</p>
    </div>
  );
}
