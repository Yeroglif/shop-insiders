import { Rating } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
  product?: {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
    rating: { count: number; rate: number };
  };
};

export default function ProductCard({
  children,
  product,
}: LayoutProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2>{product?.title}</h2>
      <p>{product?.category}</p>
      <p>{product?.price} $</p>
      <p>Stars: {product?.rating.rate}</p>
      {/* Material UI Star Rating */}
      <Rating name="half-rating-read" value={product?.rating.rate} precision={0.1} readOnly />
      {children}
      <img src={product?.image} />
      <p>{product?.description}</p>
    </div>
  );
}
