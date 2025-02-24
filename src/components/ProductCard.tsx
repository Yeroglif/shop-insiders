type LayoutProps = {
  children: React.ReactNode;
  product?: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
  };
};

export default function ProductCard({
  children,
  product,
}: LayoutProps) {
  return (
    <div>
      <h2>{product?.title}</h2>
      <p>{product?.category}</p>
      <p>{product?.price} $</p>
      {children}
      <img src={product?.image} />
      <p>{product?.description}</p>
    </div>
  );
}
