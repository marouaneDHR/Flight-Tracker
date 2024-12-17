import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  if (pageCount < 2) {
    return null;
  }

  const addButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        type="button"
        className={`btn btn-s join-item ${
          activeClass ? "bg-base-300 border-base-300" : ""
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const returnButtons = () => {
    const pageButtons = [];

    //first button
    pageButtons.push(addButton({ pageNumber: 1, activeClass: page === 1 }));
    if (page > 2)
      pageButtons.push(
        <button className="join-item btn btn-s " key={"dots-1"}>
          ...
        </button>
      );

    if (page > 1 && page < pageCount) {
      pageButtons.push(addButton({ pageNumber: page, activeClass: true }));
    }
    if (page < pageCount - 1)
      pageButtons.push(
        <button className="join-item btn btn-s " key={"dots-2"}>
          ...
        </button>
      );
    //last button
    pageButtons.push(
      addButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
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
      {returnButtons()}

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

export default ComplexPaginationContainer;
