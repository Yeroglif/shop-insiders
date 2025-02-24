type LayoutProps = {
    product?: {id:number,
        title:string,
        price:string,
        category:string,
        description:string,
        image:string};
  };

export default function ProductCard({product}: LayoutProps) {
    return (
        <div>
            <h2>{product?.title}</h2>
            <p>{product?.category}</p>
            <img src={product?.image} />
            <p>{product?.price}</p>
            <p>{product?.description}</p>
        </div>
    )
}