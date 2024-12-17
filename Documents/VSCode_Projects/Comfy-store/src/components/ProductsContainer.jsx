import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsList, BsFillGridFill } from "react-icons/bs";
import { ProductGrid, ProductList } from ".";

const getLayoutFromLocalStorage = () => {
  return localStorage.getItem("layout") || "grid";
};
const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const totalProducts = meta.pagination.total;
  const [layout, setLayout] = useState(getLayoutFromLocalStorage);

  const setActiveBtn = (pattern) => {
    return `btn btn-circle btn-sm text-content-neutral ${
      pattern === layout ? "btn-primary " : "btn-ghost "
    }`;
  };

  useEffect(() => {
    localStorage.setItem("layout", layout);
  }, [layout]);

  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b-2">
        <h4 className="font-semibold ">
          {totalProducts} product{totalProducts !== 1 ? "s" : ""}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => {
              setLayout("grid");
            }}
            className={
              setActiveBtn("grid") + " transition-transform hover:scale-105"
            }
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={() => {
              setLayout("list");
            }}
            className={
              setActiveBtn("list") + " transition-transform hover:scale-150"
            }
          >
            <BsList />
          </button>
        </div>
      </div>

      {totalProducts < 1 ? (
        <div className=" text-2xl text-slate-900 mt-10 flex justify-center items-center">
          Sorry, no products matched you search ...
        </div>
      ) : (
        <div className="flex justify-center">
          {layout === "grid" ? <ProductGrid /> : <ProductList />}
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;
