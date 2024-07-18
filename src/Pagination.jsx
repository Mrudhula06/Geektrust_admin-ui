import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination">
      <button
        className="first-page"
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="previous-page"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="next-page"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        className="last-page"
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
