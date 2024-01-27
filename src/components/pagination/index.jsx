import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../hooks/usePagination";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";
import "./index.css";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div
      id="pagination"
      className={classnames("flex flex-row max-[450px]:justify-center justify-between items-center", {
        [className]: className,
      })}
    >
      <button
        className={classnames("h-10 px-4 flex justify-center items-center shadow-md rounded-lg max-[450px]:hidden", {
          'cursor-not-allowed': currentPage === 1,
          'bg-white': currentPage !== 1,
          'bg-gray-300': currentPage === 1,
        })}
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        <img src={arrowLeft} alt="" /> <span className="hidden sm:inline-block sm:align-middle">Previous</span>
      </button>
      <div className="flex flex-row justify-between items-center space-x-1">
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <div key={`pagination-${index}`} className="pagination-item dots">
                &#8230;
              </div>
            );
          }

          return (
            <div
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              key={`pagination-${index}`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </div>
          );
        })}
      </div>
      <button
        className={classnames("h-10 px-4 flex justify-center items-center shadow-md rounded-lg max-[450px]:hidden", {
          'cursor-not-allowed': currentPage === lastPage,
          'bg-white': currentPage !== lastPage,
          'bg-gray-300': currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <span className="hidden sm:inline-block sm:align-middle">Next</span> <img src={arrowRight} alt="" />
      </button>
    </div>
  );
};

export default Pagination;
