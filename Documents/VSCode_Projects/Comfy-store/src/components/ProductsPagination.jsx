import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ProductsPagination = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  if (pageCount < 2) {
    return null;
  }
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    console.log(searchParams);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="join flex justify-end mt-12 ">
      <button
        type="button"
        className="btn btn-s join-item"
        onClick={() => {
          let prevPage = page - 1 < 1 ? pageCount : page - 1;
          handlePageChange(prevPage);
        }}
      >
        Prev
      </button>
      {pages.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            type="button"
            className={`btn btn-s join-item ${
              pageNumber === page ? "bg-base-300 border-base-300" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        className="btn btn-s join-item"
        onClick={() => {
          let nextPage = page + 1 > pageCount ? 1 : page + 1;
          handlePageChange(nextPage);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default ProductsPagination;
