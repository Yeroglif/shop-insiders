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
  rating: { count: number; rate: number };
};
function App() {
  // State to check if saved products window is open
  const [isShowSaved, setIsShowSaved] = useState(false);
  // State to contain all products
  const [products, setProducts] = useState<Product[]>([]);
  // State to contain all saved products
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  // Check if data is loading from API
  const [isLoading, setisLoading] = useState(false);
  // Check if user is Logged in
  const [isAuthorized, setIsAuthorized] = useState(false);
  // Add saved products
  function handleAddSavedProduct(product: Product) {
    if (savedProducts.some((p) => p.id === product.id)) {
      console.log("product already in the array");
      return;
    }
    const newsavedProducts = [...savedProducts];
    newsavedProducts.push(product);
    setSavedProducts(newsavedProducts);
    localStorage.setItem("savedProducts", JSON.stringify(newsavedProducts));
  }
  // Delete a saved product from saved products
  function handleDeleteSavedProduct(product: Product) {
    if (!savedProducts.some((p) => p.id === product.id)) {
      console.log("no such product in the array");
      return;
    }
    const newsavedProducts = [...savedProducts];
    newsavedProducts.splice(newsavedProducts.indexOf(product), 1);
    setSavedProducts(newsavedProducts);
    localStorage.setItem("savedProducts", JSON.stringify(newsavedProducts));
    console.log("deleted product", product);
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
      <Layout
        setIsShowSaved={setIsShowSaved}
        setIsAuthorized={setIsAuthorized}
        isAuthorized={isAuthorized}
      >
        {isAuthorized && !isShowSaved && (
          <ProductList
            isShowSaved={isShowSaved}
            products={products}
            handleAddSavedProduct={handleAddSavedProduct}
            children={undefined}
          />
        )}

        {isAuthorized && isShowSaved && (
          <ProductList
            products={savedProducts}
            handleDeleteSavedProduct={handleDeleteSavedProduct}
            children={undefined}
            isShowSaved={false}
          />
        )}
      </Layout>
    </>
  );
}

export default App;
