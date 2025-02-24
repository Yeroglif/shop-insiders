import { useEffect, useState } from "react";
import Layout from "./components/Layout.tsx";
import ProductList from "./components/ProductList.tsx";
type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};
function App() {
  const [isShowSaved, setIsShowSaved] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  function handleAddSavedProduct(product: Product) {
    if (savedProducts.some((p) => p.id === product.id)) {
      console.log("product already in the array");
      return;
    }
    const newsavedProducts = [...savedProducts];
    newsavedProducts.push(product);
    setSavedProducts(newsavedProducts);
    localStorage.setItem("savedProducts", JSON.stringify(newsavedProducts));
    console.log("added product", product);
  }

  useEffect(() => {
    //check for saved products
    if (localStorage.getItem("savedProducts")) {
      try {
        const cache: Product[] = JSON.parse(
          localStorage.getItem("savedProducts") as string
        );
        setSavedProducts(cache);
      } catch (err) {
        console.error("Error parsing savedProducts from localStorage:", err);
      }
    }
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
  }, []);

  return (
    <>
      <Layout setIsShowSaved={setIsShowSaved}>
        {!isAuthorized && !isShowSaved && (
          <ProductList
            products={products}
            handleAddSavedProduct={handleAddSavedProduct}
          />
        )}
        {!isAuthorized && isShowSaved && (
          <ProductList products={savedProducts} />
        )}
      </Layout>
    </>
  );
}

export default App;
