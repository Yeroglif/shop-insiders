import ProductCard from "./ProductCard";

type LayoutProps = {
    children: React.ReactNode;
    products?: [{id:number,
        title:string,
        price:string,
        category:string,
        description:string,
        image:string}];
  };
export default function ProductList({products}: LayoutProps) {

    return (
        <div>
            {products?.map((product, prodictIndex)=>{
                return (
                    <ProductCard key={prodictIndex} product={product} />
                )
            })}
        </div>
    )
}