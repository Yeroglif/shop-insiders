import { useState } from "react";
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
  const [productSearch, setProductSearch] = useState("");

  const filteredProduct = products.filter((ele, eleIndex) => {
    // check title
    if (ele.title.toLowerCase().includes(productSearch.toLowerCase())) {
      return true;
    }
    // check description
    if (ele.description.toLowerCase().includes(productSearch.toLowerCase())) {
      return true;
    }

    return false;
  });

  // Set up state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Calculate total number of pages
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

  return (
    <div>
      <div>
        <input
          onChange={(e) => {
            setProductSearch(e.target.value);
          }}
          type="text"
          placeholder="Search products"
          value={productSearch}
        />
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
