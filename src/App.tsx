import { useEffect, useState } from "react";
import Layout from "./components/Layout.tsx";
import ProductList from "./components/ProductList.tsx";
type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};
function App() {
  const [isShowSaved, setIsShowSaved] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [savedProducts, setSavedProducts] = useState([{}]);
  const [isLoading, setisLoading] = useState(false)

  useEffect(()=>{
    // checking if fetch is needed
    if (isLoading) {
      return;
    }
    // fetch data from api if there is none of it in the cache

    async function fetchProductsData() {
      setisLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const productsData: Product[] = await response.json(); 
        console.log("Fetched products:", productsData);
        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setisLoading(false);
      }
    }
    

    fetchProductsData();
  }, [])

  return (
    <>
      <Layout>
        <ProductList products={products} />
        {isShowSaved && <ProductList />}
      </Layout>
    </>
  );
}

export default App;
