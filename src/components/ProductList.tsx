import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};
type LayoutProps = {
  children: React.ReactNode;
  handleDeleteSavedProduct?: (product: Product) => void;
  isShowSaved: boolean;
  products?: Product[];
  handleAddSavedProduct?: (product: Product) => void;
};
export default function ProductList({
  products,
  handleAddSavedProduct,
  handleDeleteSavedProduct,
}: LayoutProps) {
  const [productSearch, setProductSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const productCatagories = [
    ...new Set<string>(products?.map((product) => product.category)),
  ];

  const filteredProduct = products
    ?.filter((ele) => {
      // check title
      if (ele.title.toLowerCase().includes(productSearch.toLowerCase())) {
        return true;
      }
      // check description
      if (ele.description.toLowerCase().includes(productSearch.toLowerCase())) {
        return true;
      }

      return false;
    })
    .filter((ele) => {
      // check selected categories
      if (selectedCategories.includes(ele.category)) {
        return true;
      } else if (!selectedCategories.length) {
        return true;
      }
      return false;
    });

  // Set up state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Calculate total number of pages
  if (!filteredProduct) {
    console.log("no filtered products present");
    return;
  }
  const totalPages = Math.ceil(filteredProduct.length / productsPerPage);

  // Slice the products array for the current page
  const currentProducts = filteredProduct.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  return (
    <div>
      {/* Products filtering */}
      <div>
        {/* Search */}
        <input
          onChange={(e) => {
            setProductSearch(e.target.value);
          }}
          type="text"
          placeholder="Search products"
          value={productSearch}
        />
        {/* Category filtering */}
        {productCatagories?.map((category, categoryIndex) => {
          return (
            <button
              key={categoryIndex}
              onClick={() => {
                if (!selectedCategories.includes(category)) {
                  const newCategories = [...selectedCategories];
                  newCategories.push(category);
                  setSelectedCategories(newCategories);
                } else {
                  const newCategories = [...selectedCategories].filter((el) => {
                    if (el === category) {
                      return false;
                    }
                    return true;
                  });
                  setSelectedCategories(newCategories);
                }
              }}
            >
              {category}
            </button>
          );
        })}
        {/* products display */}
      </div>
      {currentProducts?.map((product, prodictIndex) => {
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
      {/* Page change logic */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
